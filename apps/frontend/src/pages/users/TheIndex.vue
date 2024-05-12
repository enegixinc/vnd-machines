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
const loading:Ref<boolean> = ref(false),
    totalPages:Ref<number>=ref(1),
    pageSize:Ref<number>=ref(10),
    usersData:Ref<[]>=ref([]),
    tableFields=[
        { field: 'firstName', title: 'Name' ,hide: false},
        { field: 'email', title: 'Email' ,hide: false},
        { field: 'phoneNumber', title: 'Phone No.' ,hide: false},
        { field: 'role', title: 'Role' ,hide: false},
        { field: 'createdAt', title: 'Created At' ,hide: false,type: 'date'},
    ]
interface pageData {
    currentPage:number,
    pageSize:number
}
const users = async (data:pageData) =>{
    try {
        loading.value=true;
        const users = await vndClient.users.getMany({page:data.currentPage,limit:data.pageSize});
        usersData.value=users.data;
        totalPages.value=users.total;
        pageSize.value = data.pageSize
        console.log(users)
    }catch (err){
        console.log(err)
    }finally {
        loading.value=false;
    }
}
users({currentPage:1,pageSize:pageSize.value});
</script>
