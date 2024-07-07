<template>
    <div class="panel h-full w-full lg:col-span-2">
        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('homePageStatics.topSellingProducts') }}</h5>
        </div>

        <div class="table-responsive">
            <table class="text-center whitespace-nowrap">
                <thead>
                <tr class="border-b-0">
                    <th class="ltr:rounded-l-md rtl:rounded-r-md">{{ $t('fields.product') }}</th>
                    <th>{{ $t('fields.price') }}</th>
                    <th>{{ $t('fields.totalSoldProducts') }}</th>
                    <th class="ltr:rounded-r-md rtl:rounded-l-md">{{ $t('fields.supplier') }}</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="loading">
                    <td colspan="5">
                        <div class='flex justify-around py-[100px]'>
                                <span>
                                    <icon-loader
                                        class='animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0'/>
                                    {{ $t('wait') }}
                                </span>
                        </div>
                    </td>
                </template>
                <template v-else-if="!loading && !productsShow?.length">
                    <td colspan="5">
                        <div class='flex justify-around py-[100px] '><span class='flex items-center gap-2 '>
                            <IconInfoCircle class='inline-block align-middle  shrink-0'/>
                            {{ $t('dataTable.noData') }}
                        </span>
                        </div>
                    </td>
                </template>
                <template v-else>
                    <tr class="text-white-dark  hover:text-black dark:hover:text-white-light/90 group"
                        v-for="product in productsShow" :key="product._id"
                    >
                        <td class="overflow-hidden">
                            <div class="flex !text-start">
                                <div
                                    class="avatar w-8 h-8 rounded-md ltr:mr-3 rtl:ml-3 bg-black-light dark:bg-[#1A2941] overflow-hidden">
                                    <img
                                        class="w-full h-full  object-cover"
                                        onerror="this.style.display='none';"
                                        :src="product.productImage"
                                        alt="avatar"
                                    />
                                </div>

                                <p class="whitespace-nowrap">
                                    <span class="text-black dark:text-white">{{ product.productName }}</span>
                                    <span class="block text-xs" :class="product.color">{{
                                            product.productCategory
                                        }}</span>
                                </p>
                            </div>
                        </td>
                        <td>
                            <bdi>{{ product.price }} KD</bdi>
                        </td>
                        <td>{{ product.totalSoldProducts }}</td>
                        <td>
                            <a class="flex items-center" :class="product.color" href="javascript:;"
                               v-if="product.hasSupplier">
                                <icon-multiple-forward-right class="rtl:rotate-180 ltr:mr-1 rtl:ml-1"/>
                                {{ product.supplierName }}
                            </a>
                            <span class="flex items-center" :class="product.color" v-else>
                                  <icon-multiple-forward-right class="rtl:rotate-180 ltr:mr-1 rtl:ml-1"/>
                                    {{ product.supplierName }}
                            </span>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
import IconMultipleForwardRight from "@/components/icon/icon-multiple-forward-right.vue";
import IconLoader from '@/components/icon/icon-loader.vue';
import IconInfoCircle from "@/components/icon/icon-info-circle.vue";
import {onMounted, computed} from 'vue'
import {useProducts} from "@/composables/products/use-products"
import {randomColor} from "@/utils/colorHelper"

const {entityData: products, fetchEntities: fetchProducts, loading, t, locale, cleanResource} = useProducts({});
onMounted(() => {
    fetchProducts({
        fields: ['price,name.en,name.ar,productPictures,totalSoldProducts'],
        sort: ['totalSoldProducts,DESC'],
        join: ['supplier||firstName,lastName', 'category||name'],
        limit: 5
    })
});
const productsShow = computed(() => {
    return products.value.map(el => {
        const cleanedElement = cleanResource(el)
        return {
            ...el,
            color: randomColor(),
            supplierName: el.supplier ? `${el.supplier?.firstName} ${el.supplier?.lastName}` : t('Unknown'),
            productCategory: el.category?.name[locale.value === 'eg' ? 'ar' : 'en'] || el.category?.name[locale.value === 'eg' ? 'en' : 'ar'] || t('Unknown'),
            productImage: el.productPictures?.length ? el.productPictures[0] : '',
            productName: el.name ? el.name[locale.value === 'eg' ? 'ar' : 'en'] || el.name[locale.value === 'eg' ? 'en' : 'ar'] || t('Unknown') : t('Unknown'),
            hasSupplier: !!cleanedElement?.supplier?._id
        }
    })
})
</script>
<style scoped>
table {
    table-layout: auto !important;
}

th, td, thead th, tbody td, tfoot td, tfoot th {
    width: fit-content !important;
    text-align: center;
}
</style>
