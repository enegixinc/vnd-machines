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
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import DataTable from "@/components/ui/DataTable.vue";
import {vndClient} from "@/api"
import {ISerializedUser} from "@core";
const loading = ref(false),
    totalPages=ref(1),
    pageSize=ref<number|undefined>(10),
    usersData=ref<ISerializedUser[]>([]),
    tableFields=ref([
        { field: 'firstName', title: 'Name' ,condition:"equal",hide: false},
        { field: 'email', title: 'Email' ,hide: false},
        { field: 'phoneNumber', title: 'Phone No.' ,hide: false},
        { field: 'role', title: 'Role' ,hide: false},
        { field: 'createdAt', title: 'Created At' ,hide: false,type: 'date'},
        {field:'action',title:'',filter:false,sort:false}
    ])


// import {$OpenApiTs} from "@frontend/api-sdk"

type requestType = Parameters<typeof vndClient.users.getMany>[0]

const users = async (data: requestType) =>{
    try {
        loading.value=true;
        const users = await vndClient.users.getMany(data);
        // @ts-expect-error - to be fixed by backend
        usersData.value=users.data;
        totalPages.value=users.total;
        pageSize.value = data?.limit || 10

    }catch (err){
        console.log(err)
    }finally {
        loading.value=false;
    }
}
users({page:1,limit:pageSize.value});

</script>
