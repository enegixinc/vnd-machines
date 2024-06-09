<template>
    <div :class="{ 'has-error': errorMessage }">
        <label :for="name">{{ $t('fields.supplier') }}<span v-if="requierd" class="text-danger mx-1">*</span></label>
        <multiselect
            v-model="selectedSupplier"
            :options="Suppliers"
            class="custom-multiselect"
            :searchable="true"
            :placeholder="$t('placeHolders.selectSupplier')"
            :show-labels="false"
            :internal-search="false"
            :options-limit="100"
            :maxHeight="150"
            open-direction="bottom"
            @search-change="getSuppliers"
            track-by="_id"
            :loading="loading"
        >
            <template #option="{ option }">
                <h2>
                    {{ option.firstName }} {{ option.lastName }} <span class="text-[12px]">&#91; {{ option.businessName }} &#93;</span>
                </h2>
                <span class="block text-[12px]">{{ option.email }}</span>
                <bdi class="block text-[12px]">{{ option.phoneNumber }}</bdi>
            </template>
            <template #singleLabel="{ option }">
                {{ option.firstName }} {{ option.lastName }} <span class="text-[12px]">&#91; {{ option.businessName }} &#93;</span>
            </template>
            <template #noResult>
                {{ $t('noResults') }}
            </template>
            <template #noOptions>
                {{ $t('noOptions') }}
            </template>
        </multiselect>
        <div class="min-h-[32px] py-[8px] min-w[1px] overflow-hidden">
            <Transition name="error" mode="out-in">
                <span v-if="errorMessage" class="text-danger block font-normal text-[12px] leading-[16px] break-all text-wrap hyphens-auto">
                    {{ errorMessage }}
                </span>
            </Transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { useUser } from '@/composables/users/use-user2';
    import { useField } from 'vee-validate';

    const selectedSupplier = ref();
    interface props {
        name: string;
        requierd?: boolean;
    }
    const data = defineProps<props>();
    const { errorMessage, setValue, value } = useField(() => data.name, undefined, {});

    const {
        loading,
        fetchEntities: fetchSuppliers,
        entityData: Suppliers,
    } = useUser({
        filter: ['role||$eq||supplier'],
    });
    const getSuppliers = async (searchKey: string) => {
        if (searchKey.trim().length) {
            await fetchSuppliers({
                page: 1,
                limit: 100,
                sort: ['firstName,DESC'],
                or: [
                    `firstName||$contL||${searchKey}&filter=role||$eq||supplier`,
                    `lastName||$contL||${searchKey}&filter=role||$eq||supplier`,
                    `email||$contL||${searchKey}&filter=role||$eq||supplier`,
                    `phoneNumber||$contL||${searchKey}&filter=role||$eq||supplier`,
                    `businessName||$contL||${searchKey}&filter=role||$eq||supplier`,
                ],
            });
        }
    };
    const setInputValue = (newVal) => {
        setValue(newVal?._id || '');
    };
    watch(selectedSupplier, setInputValue);
    watch(value, (newVal) => {
        if (!newVal) {
            selectedSupplier.value = null;
        }
    });
    const { value: supplierAllInfo, setValue: setSupplier } = useField(() => 'supplier', undefined, {});
    watch(supplierAllInfo, (newVal) => {
        if (typeof newVal === 'object' && newVal !== null && newVal !== undefined && Object.keys(newVal).length > 1 && newVal._id) {
            selectedSupplier.value = newVal;
            //@ts-ignore
            Suppliers.value.push({ ...newVal });
            setSupplier({ _id: newVal?._id || '' });
        }
    });
</script>
