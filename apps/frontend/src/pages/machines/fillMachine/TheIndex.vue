<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.fillMachine')"/>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('links.fillMachine') }}</h5>
            </div>
            <form @submit="onSubmit" class="pt-5 pb-10">
                <input-group :error="machineError">
                    <label for="machine">{{ $t('fields.machine') }}<span class="text-danger mx-1">*</span></label>
                    <multiselect
                        v-model="selectedMachine"
                        :options="machinesDate"
                        id="machine"
                        class="custom-multiselect"
                        :searchable="true"
                        :placeholder="$t('placeHolders.selectMachine')"
                        :show-labels="false"
                        :internal-search="false"
                        :options-limit="100"
                        :maxHeight="150"
                        open-direction="bottom"
                        @search-change="getMachines"
                        track-by="_id"
                        :loading="loadingMachine"
                        label="name"
                    >
                        <template #noResult>
                            {{ $t('noResults') }}
                        </template>
                        <template #noOptions>
                            {{ $t('noOptions') }}
                        </template>
                    </multiselect>
                </input-group>
                <input-group :error="productErrors">
                    <label for="products">{{ $t('fields.products') }}<span class="text-danger mx-1">*</span></label>
                    <multiselect
                        v-model="selectedProducts"
                        id="products"
                        :options="options"
                        class="custom-multiselect productsSelect"
                        :searchable="true"
                        :placeholder="$t('placeHolders.selectProducts')"
                        :show-labels="false"
                        :options-limit="100"
                        :maxHeight="150"
                        :multiple="true"
                        open-direction="bottom"
                        @search-change="getProducts"
                        track-by="_id"
                        :loading="loadingProducts"
                        :custom-label="customLabel"
                        :internal-search="false"
                        :hide-selected="true"
                    >
                        <template #option="{ option }">
                         <span class="flex justify-between items-center" :class="{'disabled':!option.hasSupplier}">
                                {{option.name[locale === 'eg' ? 'ar' : 'en'] || option.name[locale === 'eg' ? 'en' : 'ar'] }}
                            <span v-if="!option.hasSupplier" class="text-danger text-xs mx-1">{{$t('machinesPages.noSupplier')}}</span>
                         </span>
                        </template>
                        <template #noResult>
                            {{ $t('noResults') }}
                        </template>
                        <template #noOptions>
                            {{ $t('noOptions') }}
                        </template>
                    </multiselect>
                    <span class="text-white-dark text-xs">{{ $t('machinesPages.atLeastOneProduct') }}</span>
                </input-group>
                <div class="table-responsive mb-[32px]">
                    <table class="text-center whitespace-nowrap">
                        <thead>
                        <tr >
                            <th class="ltr:rounded-l-md rtl:rounded-r-md !text-start">{{ $t('fields.product') }}</th>
                            <th>{{ $t('fields.costPrice') }}</th>
                            <th>{{ $t('fields.quantity') }}</th>
                            <th class="ltr:rounded-r-md rtl:rounded-l-md">{{ $t('fields.supplier') }}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="!fields.length">
                            <td colspan="4">
                                <div class='flex justify-around loading '>
          <span class='flex items-center gap-2 '>
           <IconInfoCircle
               class='inline-block align-middle  shrink-0'/>
            {{ $t('dataTable.noData') }}
          </span>
                                </div>
                            </td>
                        </template>
                        <template v-else>
                            <tr class="text-white-dark  hover:text-black dark:hover:text-white-light/90 group"
                                v-for="(field,index) in fields" :key="field.key">
                                <td class="overflow-hidden">
                                    <div class="flex !text-start">
                                        <div
                                            class="avatar w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 bg-black-light dark:bg-[#1A2941] overflow-hidden">
                                            <img
                                                class="w-full h-full  object-cover"
                                                onerror="this.style.display='none';"
                                                :src="selectedProducts[index]?.productPictures?.length? selectedProducts[index].productPictures[0] : ''"
                                                alt="avatar"
                                            />
                                        </div>

                                        <p class="whitespace-nowrap">
                                        <span class="text-black dark:text-white">{{
                                                selectedProducts[index]?.name[locale === 'eg' ? 'ar' : 'en'] ||
                                                selectedProducts[index]?.name[locale === 'eg' ? 'en' : 'ar']
                                            }}</span>
                                            <span class="block text-xs">
                                            {{ selectedProducts[index]?.upc }}
                                        </span>
                                        </p>
                                    </div>
                                </td>
                                <td>{{ selectedProducts[index]?.costPrice }}</td>
                                <td>
                                    <quantity-input :name="`products[${index}].quantity`"/>
                                </td>
                                <td>
                                    {{ selectedProducts[index]?.supplier.firstName }}
                                    {{ selectedProducts[index]?.supplier.lastName }}
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                </div>
                <div>
                    <label class="flex cursor-pointer items-center">
                        <input type="checkbox" v-model="sendEmail" class="form-checkbox bg-white dark:bg-black"
                               @blur="emailBlur($event,true)"
                               @change="emailChange($event,true)"
                        />
                        <span class="text-white-dark">{{ $t('machinesPages.sendEmail') }}</span>
                    </label>
                </div>
                <div class="mt-4 mb-[32px]">
                    <label class="flex cursor-pointer items-center">
                        <input type="checkbox" v-model="sendWhatapp" class="form-checkbox bg-white dark:bg-black "
                               @blur="whatsappBlur($event,true)"
                               @change="whatsappChange($event,true)"
                        />
                        <span class="text-white-dark">{{ $t('machinesPages.sendWhatsapp') }}</span>
                    </label>
                </div >
                <submit-button :label="$t('machinesPages.createRequest')" :loading="createRequestLoading">
                    <template #icon="{ classes }">
                        <icon-menu-notes-edit class="group-hover:!text-primary shrink-0" :class="classes"/>
                    </template>
                </submit-button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useForm, useFieldArray, useField} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {z} from 'zod';
import {computed, ref, watch} from 'vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import useMachines from '@/composables/machines/use-machines';
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconMenuNotesEdit from '@/components/icon/icon-notes-edit.vue';
import {useProducts} from '@/composables/products/use-products'
import { ISerializedProduct } from '@core';
import {MachineEntity} from "@frontend/api-sdk";
const {
    loading: loadingMachine,
    t,
    machinesDate,
    fetchMachines,
    fillMachines,
    createRequestLoading
} = useMachines();
const {loading: loadingProducts, entityData: products, fetchEntities: fetchProducts, locale,cleanResource,TheBreadcrumbs} = useProducts({})
const schema2 = computed(() =>
    toTypedSchema(
        z.object({
            products: z.array(z.object({
                product: z.object({
                    _id: z.string().min(1, {
                        message: t('validations.required', {
                            field: t('fields.product'),
                        }),
                    })
                        .default('')
                }),
                quantity: z.number().int().positive({
                    message: t('validations.positive', {
                        field: t('')
                    })
                })
            })).min(1, {
                message: t('validations.required', {
                    field: t('fields.products')
                })
            }).default([]),
            machineId: z.string().min(1, {
                message: t('validations.required', {
                    field: t('fields.machine')
                })
            }).default(''),
            notify: z.object({
                email: z.boolean().default(true),
                whatsapp: z.boolean().default(true),

            })
        })
    )
);
const {handleSubmit, resetForm,errors,submitCount } = useForm({
    validationSchema: schema2,
});
const {
    value: sendEmail,
    handleBlur: emailBlur,
    handleChange: emailChange
} = useField('notify.email', undefined, {
    type: 'checkbox',
    checkedValue: true,
    uncheckedValue: false,
})
const {
    value: sendWhatapp,
    handleBlur: whatsappBlur,
    handleChange: whatsappChange
} = useField('notify.whatsapp', undefined, {
    type: 'checkbox',
    checkedValue: true,
    uncheckedValue: false,
})

const selectedMachine = ref<MachineEntity | null>()
const getMachines = async (searchKey: string) => {
    if (searchKey.trim().length) {
        await fetchMachines({
            page: 1,
            limit: 100,
            filter: [
                `name||$contL||${searchKey}`
            ],
        });
    }
};
const {setValue: setMachineId, errorMessage:machineError, value: machineValue} = useField('machineId');
watch(selectedMachine, (newVal: any) => {
    if (newVal) {
        setMachineId(newVal._id)
    } else if (machineValue.value !== '') {
        setMachineId('')
    }
});
watch(machineValue, (newVal) => {
    if (newVal === '' && selectedMachine.value) {
        selectedMachine.value = null
    }
})


const getProducts = async (searchKey: string) => {
    if (searchKey.trim().length) {
        await fetchProducts({
            page: 1,
            limit: 100,
            filter: [
                // `name||$contL||${searchKey}`
            ],
            join: ['supplier']
        });
    }
};
const selectedProducts = ref<ISerializedProduct[]>([])
const {remove, push, fields} = useFieldArray('products')
watch(selectedProducts, (newSelected, oldSelected) => {
    if (newSelected.length === 0 && fields.value.length === 0){
        return
    }
    const addedProducts = newSelected.filter(newProduct =>
        !oldSelected.some(oldProduct => oldProduct._id === newProduct._id)
    );
    const removedProducts = oldSelected.filter(oldProduct =>
        !newSelected.some(newProduct => newProduct._id === oldProduct._id)
    );
    addedProducts.forEach(product => {
        push({
            product: {
                _id: product._id,
            },
            quantity: 1,
        });
    });
    removedProducts.forEach(product => {
        const index = fields.value.findIndex(field => field.value.product._id === product._id);
        if (index !== -1) {
            remove(index);
        }
    });
});
const productErrors = computed(()=>{
    return submitCount.value ? errors.value.products : null
})
const options = computed(()=>{
  return    products.value.map(element=>{
        const cleanedElement = cleanResource(element)
        return{...element,hasSupplier:!!cleanedElement?.supplier?._id}
    })

})
function customLabel({name}) {
    return `${name[locale.value === 'eg' ? 'ar' : 'en'] || name[locale.value === 'eg' ? 'en' : 'ar']}`
}
const scrollToTop = ()=>{
    window.scrollTo({top:0,behavior:'smooth'})
}
const onSubmit = handleSubmit(
    async (values) => {
       await fillMachines({machineId:values.machineId,
            requestBody:{products:values.products,
                notify:values.notify}
        })
        selectedMachine.value = null
        selectedProducts.value= []
        resetForm({
            values:{
                products:[],
                machineId:'',
                notify: {
                    email: true,
                    whatsapp: true,
                }
            }
        });
        scrollToTop();
    },
    () => {
        scrollToTop();
    }
);
</script>
<style scoped>
.loading {
    padding: 3em;
}

table {
    table-layout: auto !important;
}

th, td, thead th, tbody td, tfoot td, tfoot th {
    width: fit-content !important;
    text-align: center;
}


</style>
