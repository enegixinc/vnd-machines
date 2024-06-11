import {vndClient} from "@/api";
import DataTable from "@/components/ui/DataTable.vue";
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import {MachineEntity} from "@frontend/api-sdk";

import {ref} from 'vue'
type requestType = Parameters<typeof vndClient.machines.getMany>[0];
import { useI18n } from 'vue-i18n';
export default function useMachines(defaultSettings:requestType | undefined = {}){
    const loading = ref(false),
        totalPages=ref(1),
        pageSize=ref<number|undefined>(10),
        machinesDate=ref<MachineEntity[]>([]);
    const{t} =useI18n()
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
    return {
        DataTable,
        TheBreadcrumbs,
        fetchMachines,
        machinesDate,
        pageSize,
        totalPages,
        loading,
        t
    }
}
