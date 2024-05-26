<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.manageContracts')"/>
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="contractsData"
            :fields = "tableFields"
            :loading="loading"
            :table-title="$t('contractsPages.contracts')"
            @change-server="fetchContracts"
            :sortable="true"
            sort-by="totalSales"
            :row-loading="rowLoading"
            @delete-row="deleteEntity"
        />
    </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import {useContract}from "@/composables/contracts/use-contracts";
const {t,loading,totalPages,pageSize,entityData:contractsData,fetchEntities:fetchContracts,DataTable,TheBreadcrumbs,rowLoading,deleteEntity} = useContract()
const tableFields=computed(()=>{
        return [
            { field: 'supplier.firstName', title: t("fields.supplierName") ,condition:"equal",hide: false,filter:false,sort:false},
            { field: 'totalSales', title: t("fields.totalSales") ,hide: false,type:'number'},
            { field: 'totalRevenue', title: t("fields.totalRevenue") ,hide: false,type:'number'},
            { field: 'feePerSale', title: t('fields.feePerSale') ,hide: false,type:'number'},
            { field: 'feeType', title: t('fields.feeType') ,hide: false},
            { field: 'startDate', title: t('fields.startDate') ,hide: false,filter:false,type: 'date'},
            { field: 'endDate', title: t('fields.endDate') ,hide: false,filter:false,type: 'date'},
            {field:'action',title:'',filter:false,sort:false}
        ]
    });

fetchContracts({page:1,limit:pageSize.value,sort: ['totalSales,DESC']});
</script>
