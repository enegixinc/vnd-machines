import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
import { ApiClient } from '@/types/api';
import DataTable from '@/components/ui/DataTable.vue';
import TheBreadcrumbs from '@/components/ui/TheBreadcrumbs.vue';
import { useRouter } from 'vue-router';

export default function useEntityFactory<T, P extends object, S extends object = any, U extends object = any>(client: ApiClient<T, S, U>) {
    return function useEntity(defaultSettings: P = {} as P) {
        const loading = ref(false);
        const totalPages = ref(1);
        const pageSize = ref<number | undefined>(10);
        const entityData = ref<T[]>([]);
        const rowLoading = ref<string | unknown>(null),
            router = useRouter();

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
        type ResestForm = (state?: any, opts?: any) => void;
        type setValues = (fields: any, shouldValidate?: boolean) => void;
        async function addEntity(data, resetForm: ResestForm, setValues: setValues) {
            try {
                const filledData = handleEmptyLang(data);
                setValues(filledData);

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
                    const newObject = obj[key] && (Object.hasOwn(obj[key], 'ar') || Object.hasOwn(obj[key], 'en')) && obj[key];
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
        function goTo(pathName: string, routePropName?: string, routePropValue?: string): void {
            if (routePropName && routePropValue) {
                router.push({ name: pathName, params: { [routePropName]: routePropValue } });
            } else {
                router.push({ name: pathName });
            }
        }
        async function getOneEntity(data: S, resetValues: ResestForm) {
            try {
                const res = await client.getOne(data);
                resetValues({
                    values: res,
                });
            } catch (err: any) {
                if (err.status === 404) {
                    goTo('notFound');
                }
                console.error(err);
            }
        }
        async function updateEntity(data: U,msg?:string) {
            try {
                loading.value = true;
                await client.updateOne(data);
                showSuccessNotification(msg || t('entitiesPages.TheEntityHasBeenSuccessfullyUpdated'));
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } catch (err: any) {
                console.error(err);
            } finally {
                loading.value = false;
            }
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
            goTo,
            getOneEntity,
            handleEmptyLang,
            cleanResource,
            updateEntity,
        };
    };
}
