<template>
    <div>
        <div class="grid xl:grid-cols-3 gap-6 mb-6">

            <TheSales/>
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
import TheSales from "@/components/homepage/TheSales.vue";

const store = useAppStore();


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
