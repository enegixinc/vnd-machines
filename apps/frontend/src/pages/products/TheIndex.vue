<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.manageProducts')"/>
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="productsData"
            :fields = "tableFields"
            :loading="loading"
            :table-title="$t('productsPages.products')"
            @change-server="fetchProducts"
            :sortable="true"
            sort-by="price"
            :row-loading="rowLoading"
            @delete-row="deleteEntity"
        />
    </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import {useProducts}from "@/composables/products/use-products";
const {t,
    loading,
    totalPages,
    pageSize,
    entityData:productsData,
    fetchEntities:fetchProducts,
    DataTable,
    TheBreadcrumbs,
    rowLoading,
    deleteEntity} = useProducts({})
const tableFields=computed(()=>{
        return [
            { field: 'barcode', title: t("fields.barcode") ,condition:"equal",hide: false,cellRenderer:(item)=>item?.barcode || 'ــ'},
            { field: 'name.ar', title: t("fields.productName") ,hide: false,filter:false,sort:false},
            { field: 'price', title: t("fields.price") ,hide: false,type:'number'},
            { field: 'pricePerKilo', title: t("fields.pricePerKilo") ,hide: false},
            { field: 'users.firstName', title: t("fields.supplierName") ,condition:"equal",hide: false,sort:false,cellRenderer:(item)=>item?.supplier?.firstName || t('unkown')},
            { field: 'category.name.ar', title: t('fields.category') ,hide: false,filter:false,sort:false,cellRenderer:(item)=>item?.category?.name?.ar || t('unkown')},
            { field: 'brand.name.en', title: t('fields.brand') ,hide: false,filter:false,sort:false, cellRenderer:(item)=>item?.brand?.name?.en || t('unkown')},
            { field: 'additionPrice', title: t('fields.additionPrice') ,hide: false,type: 'number'},
            { field: 'costPrice', title: t('fields.costPrice') ,hide: false,type: 'number'},
            {field:'action',title:'',filter:false,sort:false}
        ]
    });
fetchProducts({page:1,limit:pageSize.value,sort: ['price,DESC']});

</script>
