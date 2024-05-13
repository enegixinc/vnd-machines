<template>
    <div>
        <TheBreadcrumbs current-location="users"/>
        <DataTable
            :pages="totalPages"
            :per-page="pageSize"
            :table-data="usersData"
            :fields = "tableFields"
            :loading="loading"
            @change-server="users"
            :sortable="true"
            sort-by="createdAt"
        />
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import type { Ref } from 'vue'
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import DataTable from "@/components/ui/DataTable.vue";
import {vndClient} from "@/api"
import {ISerializedUser} from "../../../../../libs/core";

const loading = ref(false),
    totalPages=ref(1),
    pageSize=ref(10),
    usersData=ref<ISerializedUser[]>([]),
    tableFields=[
        { field: 'firstName', title: 'Name' ,hide: false},
        { field: 'email', title: 'Email' ,hide: false},
        { field: 'phoneNumber', title: 'Phone No.' ,hide: false},
        { field: 'role', title: 'Role' ,hide: false},
        { field: 'createdAt', title: 'Created At' ,hide: false,type: 'date'},
        {field:'action',title:'Action'}
    ]
interface pageData {
    currentPage:number,
    pageSize:number
}
const users = async (data:pageData) =>{
    try {
        loading.value=true;
        const users = await vndClient.users.getMany({page:data.currentPage,limit:data.pageSize});
        // @ts-expect-error - to be fixed by backend
        usersData.value=users.data;
        totalPages.value=users.total;
        pageSize.value = data.pageSize

    }catch (err){

    }finally {
        loading.value=false;
    }
}
users({currentPage:1,pageSize:pageSize.value});
</script>
