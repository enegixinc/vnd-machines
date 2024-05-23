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
import {computed, ref} from 'vue';
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import DataTable from "@/components/ui/DataTable.vue";
import {vndClient} from "@/api"
import {ISerializedUser} from "@core";
import {useI18n} from 'vue-i18n'
import IconLoader from "@/components/icon/icon-loader.vue";
import Swal from "sweetalert2";
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
            { field: 'deletedAt', title: i18n.t('fields.deletedAt') ,hide: false,type: 'date'},
            {field:'action',title:'',filter:false,sort:false}
        ]
    }),
    rowLoading=ref<string | unknown>(null)


// import {$OpenApiTs} from "@frontend/api-sdk"

type requestType = Parameters<typeof vndClient.users.getMany>[0]

const deletedUsers = async (data: requestType = {}) =>{
    try {
        loading.value=true;
        if (data.filter){
            data.filter.push('deletedAt||$notnull')
        }else {
            data.filter = ['deletedAt||$notnull']
        }
        data.includeDeleted = 1;
        const deletedUsers = await vndClient.users.getMany(data);
        // @ts-expect-error - to be fixed by backend
        usersData.value=deletedUsers.data;
        totalPages.value=deletedUsers.total;
        pageSize.value = data?.limit || 10

    }catch (err){
        console.log(err)
    }finally {
        loading.value=false;
    }
}
    async function recoverUser(id:string){
        try {
            rowLoading.value = id
            await vndClient.users.recoverOne({id});
            deletedUsers({page:1,limit:pageSize.value})
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: i18n.t('usersPages.TheUserHasBeenSuccessfullyRecovered'),
                padding: '10px 20px',
            });
        }catch (err){
            console.log(err)
        }finally {
            rowLoading.value = null
        }
}
deletedUsers({page:1,limit:pageSize.value});

</script>
