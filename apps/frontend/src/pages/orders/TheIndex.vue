<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.manageOrders')" />
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="ordersDate"
            :fields="tableFields"
            :loading="loading"
            :table-title="$t('ordersPages.orders')"
            @change-server="fetchOrders"
            :sortable="true"
            sort-by="createdAt"
            :sticky-first-column="false"
            hide-edit
            hide-delete
        />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import useOrders from '@/composables/orders/use-orders';

const {
    t,
    loading,
    totalPages,
    pageSize,
    ordersDate,
    fetchOrders,
    DataTable,
    TheBreadcrumbs,
} = useOrders();
const tableFields = computed(() => {
    return [
        { field: 'payment_type', title: t('fields.paymentType'), hide: false, },
        { field: 'status', title: t('fields.status'), hide: false },
        { field: 'products', title: t('fields.totalProducts'), hide: false, filter:false,sort: false, cellRenderer: (item) => item?.products?.length || 0, },
        { field: 'tax', title: t('fields.tax'), hide: false, type: 'number' },
        { field: 'total', title: t('fields.totalPaid'), hide: false, type: 'number' },
        { field: 'currency', title: t('fields.currency'), hide: false, filter:false },
        { field: 'createdAt', title: t('fields.createdAt'), hide: false, type: 'date' },
        { field: 'action', title: '', filter: false, sort: false },
    ];
});

fetchOrders({ page: 1, limit: pageSize.value,sort:['createdAt,DESC'] });

</script>
