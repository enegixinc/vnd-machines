<template>

    <div :class="{'has-error':errorMessage,'has-success':meta.dirty && meta.valid}">
        <label :for="name" >{{$t('fields.supplier')}}<span v-if="requierd" class="text-danger mx-1">*</span></label>
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
            label="firstName"
            track-by="_id"
            :loading="loading"
        >
            <template #option="{option}">
                <h2>{{option.firstName}} {{option.lastName}} <span class="text-[12px]">&#91; {{option.businessName}} &#93;</span></h2>
                <span class="block text-[12px]">{{option.email}}</span>
                <bdi class="block text-[12px]">{{option.phoneNumber}}</bdi>
            </template>
            <template #singleLabel="{option}">
                {{option.firstName}} {{option.lastName}} <span class="text-[12px]">&#91; {{option.businessName}} &#93;</span>
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
import {useUser} from '@/composables/users/use-user2'

const selectedSupplier = ref();
interface props{
    name:string,
    type?:'text' | 'number' | 'tel',
    fieldLabel?:string,
    placeholder?:string,
    requierd?: boolean;
    textArea?:boolean
}
const data = defineProps<props>()
import { useField } from 'vee-validate';
const { errorMessage, meta,resetField } = useField(() => data.name,undefined,{

});
const {loading,fetchEntities:fetchSuppliers,entityData:Suppliers} = useUser({
    filter:['role||$eq||supplier']
})
const getSuppliers = async (searchKey:string)=>{
    if (searchKey.trim().length){
        await fetchSuppliers({page:1,limit:100,sort: ['firstName,DESC'],filter:[`firstName||$cont||${searchKey}`]})
    }
}
const setValue = (newVal)=>{
    resetField({
        value:newVal?._id || ''
    })
}
watch(selectedSupplier,setValue)

</script>
