<template>
    <div :class="{'has-error':errorMessage,'has-success':meta.dirty && meta.valid}">
        <label :for="name" >{{$t('fields.category')}}<span v-if="requierd" class="text-danger mx-1">*</span></label>
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
            <template #option="{option}">
                {{ option.name[locale === 'eg'? 'ar' :'en'] || option.name[locale === 'eg' ? 'en' : 'ar'] }}


            </template>
            <template #singleLabel="{option}">
                {{ option.name[locale === 'eg'? 'ar' :'en'] || option.name[locale === 'eg' ? 'en' : 'ar'] }}
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
import {ref, watch} from 'vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import {useCategories} from '@/composables/categories/use-categories'

const selectedSupplier = ref();
interface props{
    name:string,
    requierd?: boolean;
}
const data = defineProps<props>()
import { useField } from 'vee-validate';
const { errorMessage, meta,resetField } = useField(() => data.name,undefined,{

});
const {loading,fetchEntities:fetchCategories,entityData:Categories,locale} = useCategories({

})
const getCategories = async (searchKey:string)=>{
    if (searchKey.trim().length){
        await fetchCategories({page:1,limit:100})
    }
}
const setValue = (newVal)=>{
    resetField({
        value:newVal?._id || ''
    })
}
watch(selectedSupplier,setValue)

</script>
