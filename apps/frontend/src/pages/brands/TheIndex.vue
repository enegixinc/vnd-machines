<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.manageBrands')" />
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="brandsData"
            :fields="tableFields"
            :loading="loading"
            :table-title="$t('brandsPages.brands')"
            @change-server="fetchBrands"
            :sortable="true"
            sort-by="createdAt"
            :row-loading="rowLoading"
            :stickyFirstColumn="true"
            @delete-row="deleteEntity"
            @edit-row="editRow"
        />
    </div>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import { useBrands } from '@/composables/brands/use-brands';

    const {
        t,
        loading,
        totalPages,
        pageSize,
        entityData: brandsData,
        fetchEntities: fetchBrands,
        DataTable,
        TheBreadcrumbs,
        rowLoading,
        deleteEntity,
        goTo
    } = useBrands({});
    const tableFields = computed(() => {
        return [
            {
                field: 'name.ar',
                title: t('fields.brandName'),
                hide: false,
                sort: false,
                cellRenderer: (item) => item?.name?.ar || item?.name?.en || t('Unknown'),
            },
            { field: 'referTo', title: t('fields.referTo'), hide: false },
            { field: 'createdAt', title: t('fields.createdAt'), hide: false, type: 'date' },
            { field: 'action', title: '', filter: false, sort: false },
        ];
    });
    fetchBrands({ page: 1, limit: pageSize.value, sort: ['createdAt,DESC'] });
    function editRow(data) {
        goTo('edit-brand', 'id', data.id);
    }
</script>
