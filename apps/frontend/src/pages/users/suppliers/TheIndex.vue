<template>
    <div>
        <TheBreadcrumbs :current-location="$t('usersPages.suppliers')"/>
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="usersData"
            :fields = "tableFields"
            :loading="loading"
            :table-title="$t('usersPages.suppliers')"
            @change-server="fetchSuppliers"
            @delete-row="deleteUser"
            :sortable="true"
            sort-by="firstName"
            :row-loading="rowLoading"
            @edit-row="editRow"
        />
    </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n'
const {t} = useI18n()
import {useUser} from "@/composables/users/use-user2";
const {loading,totalPages,entityData:usersData,pageSize,TheBreadcrumbs,rowLoading,DataTable,fetchEntities:fetchSuppliers,deleteEntity:deleteUser,goTo} = useUser({
    filter:['role||$eq||supplier']
})
const tableFields=computed(()=>{
        return [
            { field: 'firstName', title: t("fields.name") ,condition:"equal",hide: false},
            { field: 'email', title: t("fields.email") ,hide: false},
            { field: 'phoneNumber', title: t('fields.phoneNo') ,hide: false},
            { field: 'businessName', title: t('fields.businessName') ,hide: false},
            { field: 'active', title: t('fields.status') ,hide: false},
            {field:'action',title:'',filter:false,sort:false}
        ]
    })
fetchSuppliers({page:1,limit:pageSize.value,sort: ['firstName,DESC']});
function editRow(data) {
    goTo('edit-user', 'id', data.id);
}
</script>
