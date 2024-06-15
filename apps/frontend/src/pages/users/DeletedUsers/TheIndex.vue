<template>
    <div>
        <TheBreadcrumbs :current-location="$t('usersPages.deletedUsers')"/>
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="usersData"
            :fields = "tableFields"
            :loading="loading"
            :table-title="$t('usersPages.deletedUsers')"
            :rowLoading="rowLoading"
            @change-server="deletedUsers"
            :sortable="true"
            sort-by="deletedAt"
        >
            <template #actions="{data}">
                    <button type="button" v-tippy="$t('usersPages.recoverUser')" @click="recoverUser(data.value._id)" :disabled="(rowLoading === data.value._id || !!rowLoading)" >
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
import {useI18n} from 'vue-i18n'
import IconLoader from "@/components/icon/icon-loader.vue";
import {useUser} from "@/composables/users/use-user2";
import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right.vue';
const {t} = useI18n()
const {fetchEntities:deletedUsers,loading,totalPages,pageSize,entityData:usersData,rowLoading,TheBreadcrumbs,DataTable,recoverEntity:recoverUser} = useUser( {
    filter:['deletedAt||$notnull'],
    includeDeleted:1
})
const tableFields=computed(()=>{
        return [
            { field: 'firstName', title: t("fields.name") ,condition:"equal",hide: false},
            { field: 'email', title: t("fields.email") ,hide: false},
            { field: 'phoneNumber', title: t('fields.phoneNo') ,hide: false},
            { field: 'businessName', title: t('fields.businessName') ,hide: false},
            { field: 'deletedAt', title: t('fields.deletedAt') ,hide: false,type: 'date'},
            {field:'action',title:'',filter:false,sort:false}
        ]
    })
deletedUsers({page:1,limit:pageSize.value,sort: ['deletedAt,DESC']});

</script>
