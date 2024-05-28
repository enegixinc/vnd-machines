<template>
    <div>
        <TheBreadcrumbs :current-location="$t('brandsPages.deletedBrands')"/>
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="brandsData"
            :fields = "tableFields"
            :loading="loading"
            :table-title="$t('brandsPages.deletedBrands')"
            :rowLoading="rowLoading"
            @change-server="deletedBrands"
            :sortable="true"
            sort-by="deletedAt"
        >
            <template #actions="{data}">
                <button type="button" v-tippy="$t('brandsPages.recoverBrand')"
                        @click="recoverBrand(data.value._id)" :disabled="(rowLoading === data.value._id || !!rowLoading)" >
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
import {useBrands} from "@/composables/brands/use-brands";
import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right.vue';
const {t,
    loading,
    totalPages,
    pageSize,
    entityData:brandsData,
    fetchEntities:deletedBrands,
    DataTable,
    TheBreadcrumbs,
    rowLoading,
    recoverEntity:recoverBrand} =
    useBrands({
        filter:['deletedAt||$notnull'],
        includeDeleted:1
    })
const tableFields=computed(()=>{
    return [
        {field: 'name.ar', title: t("fields.brandName"), hide: false, sort: false,
            cellRenderer: (item) => item?.name?.ar || item?.name?.en || t('unkown')
        },
        {field: 'referTo', title: t("fields.referTo"), hide: false},
        { field: 'deletedAt', title: t('fields.deletedAt') ,hide: false,type: 'date'},
        {field:'action',title:'',filter:false,sort:false}
    ]
})
deletedBrands({page:1,limit:pageSize.value,sort: ['deletedAt,DESC']});

</script>
