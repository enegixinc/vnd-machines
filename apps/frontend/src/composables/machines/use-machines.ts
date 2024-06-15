import {vndClient} from "@/api";
import DataTable from "@/components/ui/DataTable.vue";
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import {MachineEntity} from "@frontend/api-sdk";
import Swal from 'sweetalert2';
import { useI18n } from 'vue-i18n';
import {ref} from 'vue'
type requestType = Parameters<typeof vndClient.machines.getMany>[0];
type CreateRequest =  Parameters<typeof vndClient.machines.fill>[0]
export default function useMachines(defaultSettings:requestType | undefined = {}){
    const loading = ref(false),
        totalPages=ref(1),
        pageSize=ref<number|undefined>(10),
        machinesDate=ref<MachineEntity[]>([]),
        createRequestLoading=ref(false);
    const{t} =useI18n();
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    });

    function showSuccessNotification(msg: string) {
        toast.fire({
            icon: 'success',
            title: msg,
            padding: '10px 20px',
        });
    }
    const fetchMachines = async (data: requestType) =>{
        try {
            loading.value=true;
            Object.entries(defaultSettings).forEach(([key,value])=>{
                if (data && Array.isArray(value) &&data[key]){
                    data[key].push(...value)
                }else if(data){
                    data[key] = value
                }
            })
            const machines = await vndClient.machines.getMany(data);
            // @ts-expect-error - to be fixed by backend
            machinesDate.value=machines.data;
            totalPages.value=machines.total;
            pageSize.value = data?.limit || 10

        }catch (err){
            console.error(err)
        }finally {
            loading.value=false;
        }
    }
    const fillMachines = async (data:CreateRequest)=>{
        try {
            createRequestLoading.value=true
            await vndClient.machines.fill(data)
            showSuccessNotification(t('machinesPages.TheRequestHasBeenSuccessfullyCreated'))
        }catch (err){
            console.error(err)
        }finally {
            createRequestLoading.value = false
        }
    }
    return {
        DataTable,
        TheBreadcrumbs,
        fetchMachines,
        machinesDate,
        pageSize,
        totalPages,
        loading,
        fillMachines,
        t,
        createRequestLoading
    }
}
