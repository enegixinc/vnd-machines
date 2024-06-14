<template>
    <div :class="{ 'has-error': errorMessage }">
        <label :for="name">{{ $t('fields.category') }}<span v-if="requierd" class="text-danger mx-1">*</span></label>
        <multiselect
            v-model="selectedSupplier"
            :options="Categories"
            class="custom-multiselect"
            :searchable="true"
            :placeholder="$t('placeHolders.selectCategory')"
            :show-labels="false"
            :internal-search="false"
            :options-limit="100"
            :maxHeight="150"
            open-direction="bottom"
            @search-change="getCategories"
            track-by="_id"
            :loading="loading"
        >
            <template #option="{ option }">
                {{ option.name[locale === 'eg' ? 'ar' : 'en'] || option.name[locale === 'eg' ? 'en' : 'ar'] }}
            </template>
            <template #singleLabel="{ option }">
                {{ option.name[locale === 'eg' ? 'ar' : 'en'] || option.name[locale === 'eg' ? 'en' : 'ar'] }}
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
    import { useCategories } from '@/composables/categories/use-categories';
    import { useField } from 'vee-validate';

    const selectedSupplier = ref();
    interface props {
        name: string;
        requierd?: boolean;
    }
    const data = defineProps<props>();
    const { errorMessage, setValue, value } = useField(() => data.name, undefined, {});
    const { loading, fetchEntities: fetchCategories, entityData: Categories, locale } = useCategories({});
    const getCategories = async (searchKey: string) => {
        if (searchKey.trim().length) {
            await fetchCategories({ page: 1, limit: 100 });
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
    const { value: categoryAllInfo, setValue: setCategory } = useField(() => 'category', undefined, {});
    watch(categoryAllInfo, (newVal) => {
        if (typeof newVal === 'object' && newVal !== null && newVal !== undefined && Object.keys(newVal).length > 1 && newVal._id) {
            selectedSupplier.value = newVal;
            //@ts-ignore
            Categories.value.push({ ...newVal });
            setCategory({ _id: newVal?._id || '' });
        }
    });
</script>
