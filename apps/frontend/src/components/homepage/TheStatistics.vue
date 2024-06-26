<template>
    <div class="panel h-full  lg:col-span-1">
        <!-- statistics -->
        <div class="flex items-center justify-between dark:text-white-light mb-5">
            <h5 class="font-semibold text-lg">{{ $t('homePageStatics.statistics') }}</h5>
            <div class="dropdown">
                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0"
                        class="align-middle">
                    <button type="button">
                        <icon-horizontal-dots class="text-black/70 dark:text-white/70 hover:!text-primary"/>
                    </button>
                    <template #content="{ close }">
                        <ul @click="close()">
                            <li class="nav-item">
                                <button @click="selectedRange = StaticsRange.thisWeek"
                                        :class="{ active: selectedRange === StaticsRange.thisWeek }">
                                    {{ $t('rangeDates.thisWeek') }}
                                </button>
                            </li>
                            <li>
                                <button @click="selectedRange = StaticsRange.lastWeek"
                                        :class="{ active: selectedRange === StaticsRange.lastWeek }">
                                    {{ $t('rangeDates.lastWeek') }}
                                </button>
                            </li>
                            <li>
                                <button @click="selectedRange = StaticsRange.thisMonth"
                                        :class="{ active: selectedRange === StaticsRange.thisMonth }">
                                    {{ $t('rangeDates.thisMonth') }}
                                </button>
                            </li>
                            <li>
                                <button @click="selectedRange = StaticsRange.lastMonth"
                                        :class="{ active: selectedRange === StaticsRange.lastMonth }">
                                    {{ $t('rangeDates.lastMonth') }}
                                </button>
                            </li>
                        </ul>
                    </template>
                </Popper>
            </div>
        </div>
        <div class="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold sm:h-[180px]">
            <template v-if="loading">
                <div class='flex items-center justify-around h-[244px] sm:h-full sm:col-span-2'>
                                <span>
                                    <icon-loader
                                        class='animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0'/>
                                    {{ $t('wait') }}
                                </span>
                </div>
            </template>
            <template v-else>
                <div>
                    <div>
                        <div>{{ $t('fields.totalOrders') }}</div>
                        <div class="text-[#f8538d] text-lg">
                            <bdi>{{ totalOrders }}</bdi>
                        </div>
                    </div>
                    <apexchart height="58" :options="totalVisit" :series="totalVisitSeries" class="overflow-hidden">
                        <!-- loader -->
                        <div
                            class="min-h-[58px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                <span
                                    class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"
                                ></span>
                        </div>
                    </apexchart>
                </div>

                <div>
                    <div>
                        <div>{{ $t('fields.totalProducts') }}</div>
                        <div class="text-[#f8538d] text-lg">
                            <bdi>{{ totalProducts }}</bdi>
                        </div>
                    </div>
                    <apexchart height="58" :options="paidVisit" :series="paidVisitSeries" class="overflow-hidden">
                        <!-- loader -->
                        <div
                            class="min-h-[58px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                <span
                                    class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"
                                ></span>
                        </div>
                    </apexchart>
                </div>
            </template>

        </div>
    </div>
</template>
<script setup lang="ts">
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots.vue";
import {useAppStore} from "@/stores";
import {getTimeRanges} from "@/utils/DatesHelper"
import useOrders from "@/composables/orders/use-orders"
import {useProducts} from "@/composables/products/use-products"
import apexchart from 'vue3-apexcharts';
import {computed, onMounted, ref, watch} from "vue";
import IconLoader from "@/components/icon/icon-loader.vue";


const store = useAppStore();

enum StaticsRange {
    thisWeek = 0,
    lastWeek = 1,
    thisMonth = 2,
    lastMonth = 3,
}

const timeRanges = getTimeRanges();
const {loading: ordersLoading, fetchOrders, ordersDate} = useOrders();
const {loading: productsLoading, entityData: products, fetchEntities: fetchProducts} = useProducts({});
const selectedRange = ref(StaticsRange.thisWeek);
const loading = computed(() => {
    return ordersLoading.value || productsLoading.value
})

const fetchStatistics = () => {
    const filters = {
        0: [`createdAt||$gte||${timeRanges.thisWeek}`],
        1: [`createdAt||$gte||${timeRanges.lastWeek}`, `createdAt||$lt||${timeRanges.thisWeek}`],
        2: [`createdAt||$gte||${timeRanges.thisMonth}`],
        3: [`createdAt||$gte||${timeRanges.lastMonth}`, `createdAt||$lt||${timeRanges.thisMonth}`]
    };
    fetchProducts({
        fields: ['createdAt'],
        filter: filters[selectedRange.value],
        limit: Number.MAX_SAFE_INTEGER
    })
    fetchOrders({
        fields: ['createdAt'],
        filter: filters[selectedRange.value],
        limit: Number.MAX_SAFE_INTEGER
    })
}


onMounted(() => {
    fetchStatistics()
})
watch(selectedRange, () => {
    fetchStatistics()
})
const totalOrders = computed(() => {
    return new Intl.NumberFormat().format(ordersDate.value.length)
})
const totalProducts = computed(() => {
    return new Intl.NumberFormat().format(products.value.length)
})
// statistics
const totalVisit = computed(() => {
    const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
    return {
        chart: {
            height: 58,
            type: 'line',
            fontFamily: 'Nunito, sans-serif',
            sparkline: {
                enabled: true,
            },
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#009688',
                opacity: 0.4,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#009688'],
        grid: {
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
        },
        tooltip: {
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: (val: any) => {
                        return '';
                    },
                },
            },
        },
    };
});

const totalVisitSeries = ref([
    {
        data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25],
    },
]);

//paid visit
const paidVisit = computed(() => {
    const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
    return {
        chart: {
            height: 58,
            type: 'line',
            fontFamily: 'Nunito, sans-serif',
            sparkline: {
                enabled: true,
            },
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#e2a03f',
                opacity: 0.4,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#e2a03f'],
        grid: {
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
        },
        tooltip: {
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: (val: any) => {
                        return '';
                    },
                },
            },
        },
    };
});

const paidVisitSeries = ref([
    {
        data: [22, 19, 30, 47, 32, 44, 34, 55, 41, 69],
    },
]);

</script>
