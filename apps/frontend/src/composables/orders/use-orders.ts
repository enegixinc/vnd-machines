import {vndClient} from "@/api";
import DataTable from "@/components/ui/DataTable.vue";
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import {OrderEntity} from "@frontend/api-sdk";
import {ref} from 'vue'
type requestType = Parameters<typeof vndClient.users.getMany>[0];
import { useI18n } from 'vue-i18n';
export default function useOrders(defaultSettings:requestType | undefined = {}){
    const loading = ref(false),
        totalPages=ref(1),
        pageSize=ref<number|undefined>(10),
        ordersDate=ref<OrderEntity[]>([]);
const{t} =useI18n()
    const fetchOrders = async (data: requestType) =>{
        try {
            loading.value=true;
            Object.entries(defaultSettings).forEach(([key,value])=>{
                if (data && Array.isArray(value) &&data[key]){
                    data[key].push(...value)
                }else if(data){
                    data[key] = value
                }
            })
            const orders = await vndClient.orders.getMany(data);
            // @ts-expect-error - to be fixed by backend
            ordersDate.value=orders.data;
            totalPages.value=orders.total;
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
        fetchOrders,
        ordersDate,
        pageSize,
        totalPages,
        loading,
        t
    }
}
