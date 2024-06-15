<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.manageMachines')" />
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="machinesDate"
            :fields="tableFields"
            :loading="loading"
            :table-title="$t('machinesPages.machines')"
            @change-server="fetchMachines"
            :sortable="true"
            sort-by="totalOrders"
            hide-edit
            hide-delete
        />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import useMachines from '@/composables/machines/use-machines';

const {
    t,
    loading,
    totalPages,
    pageSize,
    machinesDate,
    fetchMachines,
    DataTable,
    TheBreadcrumbs,
} = useMachines();
const tableFields = computed(() => {
    return [
        { field: 'name', title: t('fields.name'), hide: false, },
        { field: 'model', title: t('fields.model'), hide: false },
        { field: 'totalOrders', title: t('fields.totalOrders'), hide: false, type: 'number' },
        { field: 'totalRevenue', title: t('fields.totalRevenue'), hide: false, type: 'number' },
        { field: 'totalSoldProducts', title: t('fields.totalSoldProducts'), hide: false, type: 'number' },
        { field: 'stock', title: t('fields.stock'), hide: false, type: 'number' },
        { field: 'machineOnline', title: t('fields.machineOnline'), hide: false },
        { field: 'status', title: t('fields.status'), hide: false,cellRenderer: (item) => item?.status ?
                `<span class="badge badge-outline-success rounded-full">${t('active')}</span>`
                :
                `<span class="badge badge-outline-danger rounded-full" v-else>${t('inactive')}</span>` },
        { field: 'action', title: '', filter: false, sort: false },
    ];
});

fetchMachines({ page: 1, limit: pageSize.value,sort:['totalOrders,DESC'] });

</script>
