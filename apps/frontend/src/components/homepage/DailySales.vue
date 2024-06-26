<template>
    <div class="panel h-full sm:col-span-2 xl:col-span-1">
        <div class="flex items-center mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">
                {{ $t('homePageStatics.dailySales') }}
                <span class="block text-white-dark text-sm font-normal">{{
                        $t('homePageStatics.goToColumnsForDetails')
                    }}</span>
            </h5>
            <div class="ltr:ml-auto rtl:mr-auto relative">
                <div
                    class="w-11 h-11 text-warning bg-[#ffeccb] dark:bg-warning dark:text-[#ffeccb] grid place-content-center rounded-full">
                    <icon-dollar-sign/>
                </div>
            </div>
        </div>

        <template v-if="loading">
            <div class='flex items-center justify-around h-[175px] '>
                                <span>
                                    <icon-loader
                                        class='animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0'/>
                                    {{ $t('wait') }}
                                </span>
            </div>
        </template>
        <template v-else>
            <div>
                <apexchart height="160" :options="dailySales"
                           :series="dailySalesSeries"
                           :key="chartKey"
                           class="bg-white dark:bg-black rounded-lg overflow-hidden">
                    <!-- loader -->
                    <div
                        class="min-h-[175px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                                    <span
                                                        class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
                    </div>
                </apexchart>
            </div>
        </template>


    </div>
</template>
<script setup lang="ts">
import IconDollarSign from "@/components/icon/icon-dollar-sign.vue";

import {useAppStore} from '@/stores/index';
import {computed, onMounted, watch, ref} from "vue";
import IconLoader from "@/components/icon/icon-loader.vue";
import useOrders from "@/composables/orders/use-orders"
import {getTimeRanges, dateIsValid} from "@/utils/DatesHelper"
import apexchart from 'vue3-apexcharts';

const store = useAppStore();
const {thisWeek, lastWeek} = getTimeRanges()
import {useI18n} from "vue-i18n";

const chartKey = ref(0)
const {locale} = useI18n()
watch(locale, () => {
    chartKey.value++
})


const {t, loading, fetchOrders, ordersDate} = useOrders();
onMounted(() => {
    fetchOrders({
        fields: ['createdAt'],
        filter: [`createdAt||$gte||${lastWeek}`],
        sort: ['createdAt,DESC'],
        limit: Number.MAX_SAFE_INTEGER
    })
})
const finalOrdersResource = computed(() => {
    return ordersDate.value.map(el => {
        const createdAt = new Date(el.createdAt);
        const day = createdAt.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase()
        return {
            createdAt,
            day
        }
    }).filter(el => {
        return dateIsValid(el.createdAt)
    })
});

function getOrdersFromOrdersGroupedByDays(ordersGroupedByDays: Partial<Record<string, {
    createdAt: Date;
    day: string
}[]>>) {
    return [
        ordersGroupedByDays['sunday']?.length || 0,
        ordersGroupedByDays['monday']?.length || 0,
        ordersGroupedByDays['tuesday']?.length || 0,
        ordersGroupedByDays['wednesday']?.length || 0,
        ordersGroupedByDays['thursday']?.length || 0,
        ordersGroupedByDays['friday']?.length || 0,
        ordersGroupedByDays['saturday']?.length || 0,
    ]
}

const thisWeekOrders = computed(() => {
    const thisWeekStart = new Date(thisWeek);
    const orders = finalOrdersResource.value.filter(el => {
        return el.createdAt >= thisWeekStart
    });
    const ordersGroupedByDays = Object.groupBy(orders, ({day}) => day);

    return getOrdersFromOrdersGroupedByDays(ordersGroupedByDays)
});
const lastWeekOrders = computed(() => {
    const lastWeekStart = new Date(lastWeek);
    const thisWeekStart = new Date(thisWeek);
    const orders = finalOrdersResource.value.filter(el => {
        return el.createdAt >= lastWeekStart && el.createdAt < thisWeekStart
    });
    const ordersGroupedByDays = Object.groupBy(orders, ({day}) => day)
    return getOrdersFromOrdersGroupedByDays(ordersGroupedByDays)
})
const dailySales = computed(() => {
    const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
    return {
        chart: {
            height: 160,
            type: 'bar',
            fontFamily: 'Nunito, sans-serif',
            toolbar: {
                show: true,
            },
            stacked: true,
            stackType: '100%',
            locales: [{
                name: "en",
                "options": {
                    "toolbar": {
                        "exportToSVG": t('homePageStatics.exportToSVG'),
                        "exportToPNG": t('homePageStatics.exportToPNG'),
                        "exportToCSV": t('homePageStatics.exportToCSV'),
                    }
                }
            }]
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 1,
        },
        colors: ['#e2a03f', '#e0e6ed'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },

        ],
        xaxis: {
            labels: {
                show: true,
            },
            categories: [
                t('weekDays.sunday'),
                t('weekDays.monday'),
                t('weekDays.tuesday'),
                t('weekDays.wednesday'),
                t('weekDays.thursday'),
                t('weekDays.friday'),
                t('weekDays.saturday')
            ],
        },
        yaxis: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '25%',
            },
        },
        legend: {
            show: false,
        },
        grid: {
            show: false,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 10,
                right: -20,
                bottom: 10,
                left: -20,
            },
        },
    };
});
const dailySalesSeries = computed(() => {
    return [
        {
            name: t('homePageStatics.sales'),
            data: thisWeekOrders.value,
        },
        {
            name: t('rangeDates.lastWeek'),
            data: lastWeekOrders.value,
        }
    ];
})


</script>

