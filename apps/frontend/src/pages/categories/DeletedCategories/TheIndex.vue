<template>
    <div>
        <TheBreadcrumbs :current-location="$t('categoriesPages.deletedCategories')" />
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="categoriesData"
            :fields="tableFields"
            :loading="loading"
            :table-title="$t('categoriesPages.deletedCategories')"
            :rowLoading="rowLoading"
            @change-server="deletedCategories"
            :sortable="true"
            sort-by="deletedAt"
        >
            <template #actions="{ data }">
                <button
                    type="button"
                    v-tippy="$t('categoriesPages.recoverCategory')"
                    @click="recoverCategory(data.value._id)"
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
    import { useCategories } from '@/composables/categories/use-categories';
    import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right.vue';

    const {
        t,
        loading,
        totalPages,
        pageSize,
        entityData: categoriesData,
        fetchEntities: deletedCategories,
        DataTable,
        TheBreadcrumbs,
        rowLoading,
        recoverEntity: recoverCategory,
    } = useCategories({
        filter: ['deletedAt||$notnull'],
        includeDeleted: 1,
    });
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
            { field: 'deletedAt', title: t('fields.deletedAt'), hide: false, type: 'date' },
            { field: 'action', title: '', filter: false, sort: false },
        ];
    });
    deletedCategories({ page: 1, limit: pageSize.value, sort: ['deletedAt,DESC'] });
</script>
