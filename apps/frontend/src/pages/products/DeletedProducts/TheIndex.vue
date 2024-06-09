<template>
    <div>
        <TheBreadcrumbs :current-location="$t('productsPages.deletedProducts')" />
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="productsData"
            :fields="tableFields"
            :loading="loading"
            :table-title="$t('productsPages.deletedProducts')"
            :rowLoading="rowLoading"
            @change-server="deletedProducts"
            :sortable="true"
            sort-by="deletedAt"
        >
            <template #actions="{ data }">
                <button
                    type="button"
                    v-tippy="$t('productsPages.recoverProducts')"
                    @click="recoverProduct(data.value._id)"
                    :disabled="rowLoading === data.value._id || !!rowLoading"
                >
                    <template v-if="rowLoading === data.value._id">
                        <icon-loader class="animate-[spin_2s_linear_infinite]" />
                    </template>
                    <template v-else>
                        <icon-multiple-forward-right class="rtl:rotate-y-180" />
                    </template>
                </button>
            </template>
        </DataTable>
    </div>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import IconLoader from '@/components/icon/icon-loader.vue';
    import { useProducts } from '@/composables/products/use-products';
    import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right.vue';

    const {
        t,
        loading,
        totalPages,
        pageSize,
        entityData: productsData,
        fetchEntities: deletedProducts,
        DataTable,
        TheBreadcrumbs,
        rowLoading,
        recoverEntity: recoverProduct,
    } = useProducts({
        filter: ['deletedAt||$notnull'],
        includeDeleted: 1,
        join: ['supplier||firstName', 'category||name', 'brand||name'],
    });
    const tableFields = computed(() => {
        return [
            { field: 'barcode', title: t('fields.barcode'), condition: 'equal', hide: false, cellRenderer: (item) => item?.barcode || 'ــ' },
            { field: 'name.ar', title: t('fields.productName'), hide: false, filter: false, sort: false },
            { field: 'price', title: t('fields.price'), hide: false, type: 'number' },
            { field: 'pricePerKilo', title: t('fields.pricePerKilo'), hide: false },
            {
                field: 'users.firstName',
                title: t('fields.supplierName'),
                condition: 'equal',
                hide: false,
                sort: false,
                cellRenderer: (item) => item?.supplier?.firstName || t('Unknown'),
            },
            {
                field: 'category.name.ar',
                title: t('fields.category'),
                hide: false,
                filter: false,
                sort: false,
                cellRenderer: (item) => item?.category?.name?.ar || t('Unknown'),
            },
            {
                field: 'brand.name.en',
                title: t('fields.brand'),
                hide: false,
                filter: false,
                sort: false,
                cellRenderer: (item) => item?.brand?.name?.en || t('Unknown'),
            },
            { field: 'deletedAt', title: t('fields.deletedAt'), hide: false, type: 'date' },
            { field: 'action', title: '', filter: false, sort: false },
        ];
    });
    deletedProducts({ page: 1, limit: pageSize.value, sort: ['deletedAt,DESC'] });
</script>
