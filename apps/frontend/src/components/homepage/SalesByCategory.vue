<template>
    <div class="panel h-full">
        <div class="flex items-center mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">{{
                    $t('homePageStatics.salesByCategoriesOrBrands')
                }}</h5>
        </div>
        <div>
            <apexchart
                height="490"
                :options="salesByCategory"
                :series="salesByCategorySeries"
                class="bg-white dark:bg-black rounded-lg overflow-hidden"
            >
                <!-- loader -->
                <div
                    class="min-h-[490px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                            <span
                                class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
                </div>
            </apexchart>
        </div>
    </div>
</template>
<script setup lang="ts">
import apexchart from 'vue3-apexcharts';
import {useAppStore} from '@/stores/index';
import {computed, ref} from "vue";
import useOrders from "@/composables/orders/use-orders"

const store = useAppStore();
const {t} = useOrders()
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
            height: 100,
            offsetY: 50,
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
                            label: t('homePageStatics.total'),
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
</script>
