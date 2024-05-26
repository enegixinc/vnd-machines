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
            hide-delete
        />
    </div>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue';
import {useI18n} from 'vue-i18n'
import {ISerializedContract} from "@core";
import {vndClient} from "@/api";
import DataTable from "@/components/ui/DataTable.vue";
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
const {t} = useI18n();
// --------------------
const loading = ref(false),
    totalPages=ref(1),
    pageSize=ref<number|undefined>(10),
    contractsData=ref<ISerializedContract[]>([]),
    tableFields=computed(()=>{
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
type requestType = Parameters<typeof vndClient.contracts.getMany>[0]
const fetchContracts = async (data: requestType) =>{
    try {
        loading.value=true;
        const contracts = await vndClient.contracts.getMany(data);
        contractsData.value=contracts.data;
        totalPages.value=contracts.total;
        pageSize.value = data?.limit || 10

    }catch (err){
        console.log(err)
    }finally {
        loading.value=false;
    }
}
fetchContracts({page:1,limit:pageSize.value,sort: ['totalSales,DESC']});
</script>
