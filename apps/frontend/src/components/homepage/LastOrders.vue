<template>
    <div class="panel lg:col-span-1 h-full w-full">
        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('homePageStatics.recentOrders') }}</h5>
        </div>
        <div class="table-responsive">
            <table class="text-center whitespace-nowrap">
                <thead>
                <tr class="border-b-0">
                    <th class="ltr:rounded-l-md rtl:rounded-r-md">{{ $t('fields.paymentType') }}</th>
                    <th>{{ $t('fields.totalProducts') }}</th>
                    <th>{{ $t('fields.totalPaid') }}</th>
                    <th>{{ $t('fields.createdAt') }}</th>
                    <th class="ltr:rounded-r-md rtl:rounded-l-md">{{ $t('fields.machine') }}</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="loading">
                    <td colspan="5">
                        <div class='flex justify-around py-[100px]'>
                                <span>
                                    <icon-loader
                                        class='animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0'/>
                                    {{ $t('wait') }}
                                </span>
                        </div>
                    </td>
                </template>
                <template v-else-if="!loading && !ordersShows?.length">
                    <td colspan="5">
                        <div class='flex justify-around py-[100px] '><span class='flex items-center gap-2 '>
                            <IconInfoCircle class='inline-block align-middle  shrink-0'/>
                            {{ $t('dataTable.noData') }}
                        </span>
                        </div>
                    </td>
                </template>
                <template v-else>
                    <tr class="text-white-dark  hover:text-black dark:hover:text-white-light/90 group"
                        v-for="order in ordersShows" :key="order._id"
                    >
                        <td>
                            <span v-if="order.payment_type === 'CARD'" class="text-blue-700 font-bold uppercase">
                            {{ $t('ordersPages.visa') }}
                            </span>
                            <span v-else class="text-green-600 font-bold ">
                           {{ $t('ordersPages.cash') }}
                        </span>
                        </td>
                        <td>{{ order.totalQuantity }}</td>
                        <td>
                            <bdi>{{ order.total }} KD</bdi>
                        </td>
                        <td>{{ order.createdAt }}</td>
                        <td>
                            <span class="min-w-[150px] badge  shadow-md dark:group-hover:bg-transparent"
                                  :class="order.bg">{{ order.machineName }}</span>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
import IconLoader from '@/components/icon/icon-loader.vue';
import IconInfoCircle from "@/components/icon/icon-info-circle.vue";
import {onMounted, computed} from 'vue'
import useOrders from "@/composables/orders/use-orders"
import {randomBadgeBg} from "@/utils/colorHelper"

const {loading, fetchOrders, ordersDate, t} = useOrders({});
onMounted(() => {
    fetchOrders({
        fields: ['payment_type,totalQuantity,total,currency,createdAt'],
        sort: ['createdAt,DESC'],
        join: ['machine||fullName'],
        limit: 6
    })
});
const ordersShows = computed(() => {
    return ordersDate.value.map(el => {
        return {
            ...el,
            createdAt: formatDate(el.createdAt),
            bg: randomBadgeBg(),
            totalQuantity: el.totalQuantity ?? 0,
            machineName: el.machine?.fullName ?? t('Unknown')
        }
    })
})
const formatDate = (date) => {
    if (date) {
        const dt = new Date(date);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        return day + '/' + month + '/' + dt.getFullYear();
    }
    return '';
};
</script>
<style scoped>
table {
    table-layout: auto !important;
}

th, td, thead th, tbody td, tfoot td, tfoot th {
    width: fit-content !important;
    text-align: center;
}
</style>
