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
            @change-server="suppliers"
            :sortable="true"
            sort-by="firstName"
        />
    </div>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue';
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import DataTable from "@/components/ui/DataTable.vue";
import {vndClient} from "@/api"
import {ISerializedUser} from "@core";
import {useI18n} from 'vue-i18n'
const i18n = useI18n()

const loading = ref(false),
    totalPages=ref(1),
    pageSize=ref<number|undefined>(10),
    usersData=ref<ISerializedUser[]>([]),
    tableFields=computed(()=>{
        return [
            { field: 'firstName', title: i18n.t("fields.name") ,condition:"equal",hide: false},
            { field: 'email', title: i18n.t("fields.email") ,hide: false},
            { field: 'phoneNumber', title: i18n.t('fields.phoneNo') ,hide: false},
            { field: 'businessName', title: i18n.t('fields.businessName') ,hide: false},
            { field: 'active', title: i18n.t('fields.status') ,hide: false},
            {field:'action',title:'',filter:false,sort:false}
        ]
    })


// import {$OpenApiTs} from "@frontend/api-sdk"

type requestType = Parameters<typeof vndClient.users.getMany>[0]

const suppliers = async (data: requestType = {}) =>{
    try {
        loading.value=true;
        if (data.filter){
            data.filter.push('role||$eq||supplier')
        }else {
            data.filter = ['role||$eq||supplier']
        }
        const suppliers = await vndClient.users.getMany(data);
        // @ts-expect-error - to be fixed by backend
        usersData.value=suppliers.data;
        totalPages.value=suppliers.total;
        pageSize.value = data?.limit || 10

    }catch (err){
        console.log(err)
    }finally {
        loading.value=false;
    }
}
suppliers({page:1,limit:pageSize.value});

</script>
