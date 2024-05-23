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
        />
    </div>
</template>
<script setup lang="ts">
import {computed} from 'vue';
import {useI18n} from 'vue-i18n'
const {t} = useI18n()
import useUser from "@/composables/users/use-user";
const {loading,totalPages,usersData,pageSize,TheBreadcrumbs,DataTable,fetchUsers:fetchSuppliers,deleteUser} = useUser({
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
fetchSuppliers({page:1,limit:pageSize.value});

</script>
