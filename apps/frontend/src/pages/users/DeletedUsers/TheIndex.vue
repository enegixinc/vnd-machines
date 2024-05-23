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
            @change-server="deletedUsers"
            :sortable="true"
            sort-by="deletedAt"
        >
            <template #actions="{data}">
                <button type="button" class="btn btn-info w-36 shadow-none disabled:opacity-60" :disabled="(rowLoading === data.value._id || !!rowLoading)" @click="recoverUser(data.value._id)" >
                    <template v-if="rowLoading === data.value._id">
                        <icon-loader class="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
                        {{ $t('wait') }}
                    </template>
                    <template v-else>
                        {{ $t('usersPages.recoverUser') }}
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
import useUser from "@/composables/users/use-user";
const {t} = useI18n()
const {fetchUsers:deletedUsers,loading,totalPages,pageSize,usersData,rowLoading,TheBreadcrumbs,DataTable,recoverUser} = useUser( {
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
deletedUsers({page:1,limit:pageSize.value});

</script>
