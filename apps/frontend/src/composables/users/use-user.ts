import {vndClient} from "@/api";
import Swal from "sweetalert2";
import {useI18n} from "vue-i18n";
import DataTable from "@/components/ui/DataTable.vue";
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import {ISerializedUser} from "@core";
import {ref} from 'vue'
// import {$OpenApiTs} from "@frontend/api-sdk"
type requestType = Parameters<typeof vndClient.users.getMany>[0]
export default function useUser(defaultSettings:requestType = {}){
    const loading = ref(false),
        totalPages=ref(1),
        pageSize=ref<number|undefined>(10),
        usersData=ref<ISerializedUser[]>([]),
        rowLoading=ref<string | unknown>(null);
    const fetchUsers = async (data: requestType) =>{
        try {
            loading.value=true;
            Object.entries(defaultSettings).forEach(([key,value])=>{
                if (data && Array.isArray(value) &&data[key]){
                    data[key].push(...value)
                }else if(data){
                    data[key] = value
                }
            })
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

    const {t} = useI18n()
    const swal = Swal.mixin({
        customClass: {
            popup: 'sweet-alerts',
            confirmButton: 'btn btn-danger shadow-none',
            cancelButton: 'btn btn-dark shadow-none ltr:mr-3 rtl:ml-3',
        },
        buttonsStyling: false,
    });
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,

        timer: 3000,
    });
    function showSuccessNotfication(msg:string){
        toast.fire({
            icon: 'success',
            title: msg,
            padding: '10px 20px',
        });
    }
    async function deleteUser(id:string){
       const confirm = await swal.fire({
           title: t('sweetAlert.areYouSure'),
           text: t('sweetAlert.youWantToDeleteThisUser'),
           icon: 'warning',
           showCancelButton: true,
           confirmButtonText: t('sweetAlert.yesDeleteIt'),
           cancelButtonText: t('sweetAlert.noCancel'),
           reverseButtons: true,
           padding: '2em',
       })
     if (!confirm.isConfirmed){
         return
     }
     try {
         rowLoading.value = id
         await vndClient.users.deleteOne({id});
         showSuccessNotfication(t('usersPages.TheUserHasBeenSuccessfullyDeleted'))
         fetchUsers({page:1,limit:pageSize.value});
     }catch (err){
         console.log(err)
     }finally {
         rowLoading.value = null
     }

    }
    async function recoverUser(id:string){
        try {
            rowLoading.value = id
            await vndClient.users.recoverOne({id});
            fetchUsers({page:1,limit:pageSize.value})
            showSuccessNotfication(t('usersPages.TheUserHasBeenSuccessfullyRecovered'))
        }catch (err){
            console.log(err)
        }finally {
            rowLoading.value = null
        }
    }
    return {
        deleteUser,
        DataTable,
        TheBreadcrumbs,
        fetchUsers,
        usersData,
        pageSize,
        totalPages,
        loading,
        recoverUser,
        rowLoading
    }
}
