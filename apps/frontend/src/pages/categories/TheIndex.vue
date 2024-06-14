<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.manageCategories')" />
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="categoriesData"
            :fields="tableFields"
            :loading="loading"
            :table-title="$t('categoriesPages.categories')"
            @change-server="fetchCategories"
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
    import { useCategories } from '@/composables/categories/use-categories';

    const {
        t,
        loading,
        totalPages,
        pageSize,
        entityData: categoriesData,
        fetchEntities: fetchCategories,
        DataTable,
        TheBreadcrumbs,
        rowLoading,
        deleteEntity,
        goTo
    } = useCategories({});
    const tableFields = computed(() => {
        return [
            {
                field: 'name.ar',
                title: t('fields.categoryName'),
                hide: false,
                sort: false,
                cellRenderer: (item) => item?.name?.ar || item?.name?.en || t('Unknown'),
            },
            { field: 'referTo', title: t('fields.referTo'), hide: false },
            { field: 'createdAt', title: t('fields.createdAt'), hide: false, type: 'date' },
            { field: 'action', title: '', filter: false, sort: false },
        ];
    });
    fetchCategories({ page: 1, limit: pageSize.value, sort: ['createdAt,DESC'] });
    function editRow(data) {
        goTo('edit-category', 'id', data.id);
    }
</script>
