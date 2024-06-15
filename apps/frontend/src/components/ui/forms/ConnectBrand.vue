<template>
    <div :class="{ 'has-error': errorMessage }">
        <label :for="name">{{ $t('fields.brand') }}<span v-if="requierd" class="text-danger mx-1">*</span></label>
        <multiselect
            v-model="selectedBrands"
            :options="Brands"
            class="custom-multiselect"
            :searchable="true"
            :placeholder="$t('placeHolders.selectBrand')"
            :show-labels="false"
            :internal-search="false"
            :options-limit="100"
            :maxHeight="150"
            open-direction="bottom"
            @search-change="getBrands"
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
    import { useBrands } from '@/composables/brands/use-brands';
    import { useField } from 'vee-validate';

    const selectedBrands = ref();
    interface props {
        name: string;
        requierd?: boolean;
    }
    const data = defineProps<props>();
    const { errorMessage, setValue, value } = useField(() => data.name, undefined, {});
    const { loading, fetchEntities: fetchBrands, entityData: Brands, locale } = useBrands({});
    const getBrands = async (searchKey: string) => {
        if (searchKey.trim().length) {
            await fetchBrands({ page: 1, limit: 100 });
        }
    };
    const setInputValue = (newVal) => {
        setValue(newVal?._id || '');
    };
    watch(selectedBrands, setInputValue);
    watch(value, (newVal) => {
        if (!newVal) {
            selectedBrands.value = null;
        }
    });
    const { value: brandAllInfo, setValue: setBrand } = useField(() => 'brand', undefined, {});
    watch(brandAllInfo, (newVal) => {
        if (typeof newVal === 'object' && newVal !== null && newVal !== undefined && Object.keys(newVal).length > 1 && newVal._id) {
            selectedBrands.value = newVal;
            //@ts-ignore
            Brands.value.push({ ...newVal });
            setBrand({ _id: newVal?._id || '' });
        }
    });
</script>
