<template>
    <div>
        <div class="grid xl:grid-cols-3 gap-6 mb-6">
            <div class="panel h-full xl:col-span-2">
                <div class="flex items-center justify-between dark:text-white-light mb-5">
                    <h5 class="font-semibold text-lg">Sales</h5>
                    <div class="dropdown ltr:ml-auto rtl:mr-auto">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0"
                                class="align-middle">
                            <a href="javascript:;">
                                <icon-horizontal-dots class="text-black/70 dark:text-white/70 hover:!text-primary"/>
                            </a>
                            <template #content="{ close }">
                                <ul @click="close()">
                                    <li>
                                        <a href="javascript:;">Weekly</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">Monthly</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">Yearly</a>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>
                <p class="text-lg dark:text-white-light/90">Total Profit <span
                    class="text-primary ml-2">10,840 KD</span></p>
                <div class="relative">
                    <apexchart height="325" :options="revenueChart" :series="revenueSeries"
                               class="bg-white dark:bg-black rounded-lg overflow-hidden">
                        <!-- loader -->
                        <div
                            class="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                            <span
                                class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
                        </div>
                    </apexchart>
                </div>
            </div>

            <div class="panel h-full">
                <div class="flex items-center mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">Sales By Category</h5>
                </div>
                <div>
                    <apexchart
                        height="460"
                        :options="salesByCategory"
                        :series="salesByCategorySeries"
                        class="bg-white dark:bg-black rounded-lg overflow-hidden"
                    >
                        <!-- loader -->
                        <div
                            class="min-h-[460px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                            <span
                                class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
                        </div>
                    </apexchart>
                </div>
            </div>
        </div>
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            <DailySales/>
            <div class="panel h-full">
                <div class="flex items-center dark:text-white-light mb-5">
                    <h5 class="font-semibold text-lg">Summary</h5>
                    <div class="dropdown ltr:ml-auto rtl:mr-auto">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0"
                                class="align-middle">
                            <a href="javascript:;">
                                <icon-horizontal-dots
                                    class="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary"/>
                            </a>
                            <template #content="{ close }">
                                <ul @click="close()">
                                    <li>
                                        <a href="javascript:;">View Report</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">Edit Report</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">Mark as Done</a>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>
                <div class="space-y-9">
                    <div class="flex items-center">
                        <div class="w-9 h-9 ltr:mr-3 rtl:ml-3">
                            <div
                                class="bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light rounded-full w-9 h-9 grid place-content-center"
                            >
                                <icon-inbox/>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex font-semibold text-white-dark mb-2">
                                <h6>Income</h6>
                                <p class="ltr:ml-auto rtl:mr-auto">92,600 KD</p>
                            </div>
                            <div class="rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                <div
                                    class="bg-gradient-to-r from-[#7579ff] to-[#b224ef] w-11/12 h-full rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-9 h-9 ltr:mr-3 rtl:ml-3">
                            <div
                                class="bg-success-light dark:bg-success text-success dark:text-success-light rounded-full w-9 h-9 grid place-content-center">
                                <icon-tag/>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex font-semibold text-white-dark mb-2">
                                <h6>Profit</h6>
                                <p class="ltr:ml-auto rtl:mr-auto">37,515 KD</p>
                            </div>
                            <div class="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                <div class="bg-gradient-to-r from-[#3cba92] to-[#0ba360] w-full h-full rounded-full"
                                     style="width: 65%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="w-9 h-9 ltr:mr-3 rtl:ml-3">
                            <div
                                class="bg-warning-light dark:bg-warning text-warning dark:text-warning-light rounded-full w-9 h-9 grid place-content-center">
                                <icon-credit-card/>
                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex font-semibold text-white-dark mb-2">
                                <h6>Expenses</h6>
                                <p class="ltr:ml-auto rtl:mr-auto">55,085 KD</p>
                            </div>
                            <div class="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                <div class="bg-gradient-to-r from-[#f09819] to-[#ff5858] w-full h-full rounded-full"
                                     style="width: 80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TheStatistics/>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <LastOrders/>
            <TopSellingProducts/>
        </div>

    </div>
</template>
<script lang="ts" setup>
import {computed, ref} from 'vue';
import apexchart from 'vue3-apexcharts';
import {useAppStore} from '@/stores/index';

import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';

import IconInbox from '@/components/icon/icon-inbox.vue';
import IconTag from '@/components/icon/icon-tag.vue';
import IconCreditCard from '@/components/icon/icon-credit-card.vue';
import TopSellingProducts from "@/components/homepage/TopSellingProducts.vue";
import LastOrders from "@/components/homepage/LastOrders.vue";
import TheStatistics from "@/components/homepage/TheStatistics.vue";
import DailySales from "@/components/homepage/DailySales.vue";

const store = useAppStore();

// revenue
const revenueChart = computed(() => {
    const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
    const isRtl = store.rtlClass === 'rtl' ? true : false;
    return {
        chart: {
            height: 325,
            type: 'area',
            fontFamily: 'Nunito, sans-serif',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: 2,
            lineCap: 'square',
        },
        dropShadow: {
            enabled: true,
            opacity: 0.2,
            blur: 10,
            left: -7,
            top: 22,
        },
        colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
        markers: {
            discrete: [
                {
                    seriesIndex: 0,
                    dataPointIndex: 6,
                    fillColor: '#1b55e2',
                    strokeColor: 'transparent',
                    size: 7,
                },
                {
                    seriesIndex: 1,
                    dataPointIndex: 5,
                    fillColor: '#e7515a',
                    strokeColor: 'transparent',
                    size: 7,
                },
            ],
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: true,
            },
            labels: {
                offsetX: isRtl ? 2 : 0,
                offsetY: 5,
                style: {
                    fontSize: '12px',
                    cssClass: 'apexcharts-xaxis-title',
                },
            },
        },
        yaxis: {
            tickAmount: 7,
            labels: {
                formatter: (value: number) => {
                    return value / 1000 + 'K';
                },
                offsetX: isRtl ? -30 : -10,
                offsetY: 0,
                style: {
                    fontSize: '12px',
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
            opposite: isRtl ? true : false,
        },
        grid: {
            borderColor: isDark ? '#191e3a' : '#e0e6ed',
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '16px',
            markers: {
                width: 10,
                height: 10,
                offsetX: -2,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5,
            },
        },
        tooltip: {
            marker: {
                show: true,
            },
            x: {
                show: false,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: !1,
                opacityFrom: isDark ? 0.19 : 0.28,
                opacityTo: 0.05,
                stops: isDark ? [100, 100] : [45, 100],
            },
        },
    };
});

const revenueSeries = ref([
    {
        name: 'Machine1',
        data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
    },
    {
        name: 'Machine2',
        data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
    },
]);

// sales by category
const salesByCategory = computed(() => {
    const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
    return {
        chart: {
            type: 'donut',
            height: 460,
            fontFamily: 'Nunito, sans-serif',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 25,
            colors: isDark ? '#0e1726' : '#fff',
        },
        colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 10,
                height: 10,
                offsetX: -2,
            },
            height: 50,
            offsetY: 20,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '29px',
                            offsetY: -10,
                        },
                        value: {
                            show: true,
                            fontSize: '26px',
                            color: isDark ? '#bfc9d4' : undefined,
                            offsetY: 16,
                            formatter: (val: any) => {
                                return val;
                            },
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#888ea8',
                            fontSize: '29px',
                            formatter: (w: any) => {
                                return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                    return a + b;
                                }, 0);
                            },
                        },
                    },
                },
            },
        },
        labels: ['Drinks', 'Snacks', 'Others'],
        states: {
            hover: {
                filter: {
                    type: 'none',
                    value: 0.15,
                },
            },
            active: {
                filter: {
                    type: 'none',
                    value: 0.15,
                },
            },
        },
    };
});

const salesByCategorySeries = ref([55, 35, 15]);

// daily sales


</script>
