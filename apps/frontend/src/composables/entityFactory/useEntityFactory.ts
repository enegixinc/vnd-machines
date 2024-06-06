import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
import { ApiClient } from '@/types/api';
import DataTable from '@/components/ui/DataTable.vue';
import TheBreadcrumbs from '@/components/ui/TheBreadcrumbs.vue';

export default function useEntityFactory<T, P extends object>(client: ApiClient<T>) {
    return function useEntity(defaultSettings: P = {} as P) {
        const loading = ref(false);
        const totalPages = ref(1);
        const pageSize = ref<number | undefined>(10);
        const entityData = ref<T[]>([]);
        const rowLoading = ref<string | unknown>(null);

        const fetchEntities = async (data: P) => {
            try {
                loading.value = true;
                if (defaultSettings) {
                    Object.entries(defaultSettings).forEach(([key, value]) => {
                        if (data && Array.isArray(value) && data[key as keyof P]) {
                            (data[key as keyof P] as unknown[]).push(...value);
                        } else if (data) {
                            data[key as keyof P] = value as P[keyof P];
                        }
                    });
                }
                const entities = await client.getMany(data);
                entityData.value = entities.data;
                totalPages.value = entities.total;
                pageSize.value = (data as any).limit || 10;
            } catch (err) {
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        const { t, locale } = useI18n();
        const swal = Swal.mixin({
            customClass: {
                popup: 'sweet-alerts',
                confirmButton: 'btn btn-danger shadow-none',
                cancelButton: 'btn btn-dark shadow-none ltr:mr-3 rtl:ml-3',
            },
            buttonsStyling: false,
        });

        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });

        function showSuccessNotification(msg: string) {
            toast.fire({
                icon: 'success',
                title: msg,
                padding: '10px 20px',
            });
        }

        async function deleteEntity(id: string) {
            const confirm = await swal.fire({
                title: t('sweetAlert.areYouSure'),
                text: t('sweetAlert.youWantToDeleteThisEntity'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: t('sweetAlert.yesDeleteIt'),
                cancelButtonText: t('sweetAlert.noCancel'),
                reverseButtons: true,
                padding: '2em',
            });

            if (!confirm.isConfirmed) {
                return;
            }

            try {
                rowLoading.value = id;
                await client.deleteOne({ id });
                showSuccessNotification(t('entitiesPages.TheEntityHasBeenSuccessfullyDeleted'));
                fetchEntities({ page: 1, limit: pageSize.value } as P);
            } catch (err) {
                console.error(err);
            } finally {
                rowLoading.value = null;
            }
        }

        async function recoverEntity(id: string) {
            try {
                rowLoading.value = id;
                await client.recoverOne({ id });
                fetchEntities({ page: 1, limit: pageSize.value } as P);
                showSuccessNotification(t('entitiesPages.TheEntityHasBeenSuccessfullyRecovered'));
            } catch (err) {
                console.error(err);
            } finally {
                rowLoading.value = null;
            }
        }
        type ResestForm = (state?: unknown, options?: unknown) => void;
        async function addEntity(data, resetForm: ResestForm) {
            try {
                const filledData = handleEmptyLang(data);
                resetForm({
                    values: filledData,
                });
                const cleanedDate = cleanResource(filledData);
                loading.value = true;
                await client.createOne({
                    requestBody: cleanedDate,
                });
                showSuccessNotification(t('entitiesPages.TheEntityHasBeenSuccessfullyAdded'));
                resetForm();
            } catch (err) {
                console.error(err);
            } finally {
                loading.value = false;
            }
        }

        type AnyObject = { [key: string]: any };

        function cleanResource(obj: AnyObject): AnyObject {
            if (Array.isArray(obj)) {
                return obj.map(cleanResource);
            } else if (typeof obj === 'object' && obj !== null) {
                const newObj: AnyObject = {};
                for (const key in obj) {
                    if (obj[key] && typeof obj[key] === 'object') {
                        const nestedObj = cleanResource(obj[key]);
                        if (Object.keys(nestedObj).length > 0 || Array.isArray(nestedObj)) {
                            newObj[key] = nestedObj;
                        }
                    } else if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
                        newObj[key] = obj[key];
                    }
                }
                return newObj;
            }
            return obj;
        }

        function handleEmptyLang(obj: AnyObject): AnyObject {
            const filledData: AnyObject = {};
            if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                    const newObject = obj[key] && Object.hasOwn(obj[key], 'ar') && obj[key];
                    if (newObject) {
                        if (newObject['en'] === '' && newObject['ar'] !== '') {
                            newObject['en'] = newObject['ar'];
                        }
                        if (newObject['ar'] === '' && newObject['en'] !== '') {
                            newObject['ar'] = newObject['en'];
                        }
                        filledData[key] = newObject;
                    }
                }
            }
            return { ...obj, ...filledData };
        }

        return {
            deleteEntity,
            fetchEntities,
            entityData,
            pageSize,
            totalPages,
            loading,
            recoverEntity,
            rowLoading,
            DataTable,
            TheBreadcrumbs,
            t,
            locale,
            addEntity,
        };
    };
}
