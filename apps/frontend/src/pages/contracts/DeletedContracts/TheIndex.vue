<template>
    <div>
        <TheBreadcrumbs :current-location="$t('contractsPages.deletedContracts')"/>
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="contractsData"
            :fields = "tableFields"
            :loading="loading"
            :table-title="$t('contractsPages.deletedContracts')"
            :rowLoading="rowLoading"
            @change-server="deletedContracts"
            :sortable="true"
            sort-by="deletedAt"
        >
            <template #actions="{data}">
                <button type="button" v-tippy="$t('contractsPages.recoverContract')" @click="recoverUser(data.value._id)" :disabled="(rowLoading === data.value._id || !!rowLoading)" >
                    <template v-if="rowLoading === data.value._id">
                        <icon-loader class="animate-[spin_2s_linear_infinite]" />
                    </template>
                    <template v-else>
                        <icon-multiple-forward-right class="rtl:rotate-y-180"/>
                    </template>

                </button>
            </template>
        </DataTable>
    </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';

import IconLoader from "@/components/icon/icon-loader.vue";
import {useContract} from "@/composables/contracts/use-contracts";
import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right.vue';
const {t,loading,totalPages,pageSize,entityData:contractsData,fetchEntities:deletedContracts,DataTable,TheBreadcrumbs,rowLoading,recoverEntity:recoverUser} =
    useContract({
        filter:['deletedAt||$notnull'],
        includeDeleted:1
    })
const tableFields=computed(()=>{
    return [
        { field: 'supplier.firstName', title: t("fields.supplierName") ,condition:"equal",hide: false,filter:false,sort:false},
        { field: 'deletedAt', title: t('fields.deletedAt') ,hide: false,type: 'date'},
        {field:'action',title:'',filter:false,sort:false}
    ]
})
deletedContracts({page:1,limit:pageSize.value,sort: ['deletedAt,DESC']});

</script>
