<template>
    <div class="panel h-full xl:col-span-2 overflow-hidden max-w-full">
        <div class="flex items-center justify-between dark:text-white-light mb-5">
            <h5 class="font-semibold text-lg">{{ $t('homePageStatics.sales') }}</h5>
            <div class="dropdown ltr:ml-auto rtl:mr-auto">
                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0"
                        class="align-middle">
                    <a href="javascript:;">
                        <icon-horizontal-dots class="text-black/70 dark:text-white/70 hover:!text-primary"/>
                    </a>
                    <template #content="{ close }">
                        <ul @click="close()">
                            <li class="nav-item">
                                <button @click="selectedStatistics = Statistics.Monthly"
                                        :class="{ active: selectedStatistics === Statistics.Monthly }">
                                    {{ $t('rangeDates.monthly') }}
                                </button>
                            </li>
                            <li>
                                <button @click="selectedStatistics = Statistics.Weekly"
                                        :class="{ active: selectedStatistics === Statistics.Weekly }">
                                    {{ $t('rangeDates.weekly') }}
                                </button>
                            </li>
                            <li>
                                <button @click="selectedStatistics = Statistics.Yearly"
                                        :class="{ active: selectedStatistics === Statistics.Yearly}">
                                    {{ $t('rangeDates.yearly') }}
                                </button>
                            </li>
                        </ul>
                    </template>
                </Popper>
            </div>
        </div>
        <p class="text-lg dark:text-white-light/90">{{ $t('homePageStatics.totalProfit') }}
            <bdi
                class="text-primary ml-2">10,840 KD
            </bdi>
        </p>
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
</template>
<script setup lang="ts">
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots.vue";
import {useAppStore} from '@/stores/index';

const store = useAppStore();
import apexchart from 'vue3-apexcharts';
import {computed, onMounted, ref, watch} from "vue";
import useOrders from "@/composables/orders/use-orders"

const {t, loading, fetchOrders, ordersDate} = useOrders()
import {getTimeRanges, getFullyYear, getWeekNumberLocal, getMonthName} from "@/utils/DatesHelper"
import {isValidNumber} from "@/utils/NumbersHelpers"

const {thisYear} = getTimeRanges()

enum Statistics {
    Weekly = 0,
    Monthly = 1,
    Yearly = 2,
}

const selectedStatistics = ref(Statistics.Monthly);
const fetchStatistics = () => {
    const filters = {
        0: [`createdAt||$gte||${thisYear}`],
        1: [`createdAt||$gte||${thisYear}`],
        2: [],

    };
    fetchOrders({
        fields: ['createdAt,total'],
        filter: filters[selectedStatistics.value],
        join: ['machine||fullName'],
        limit: Number.MAX_SAFE_INTEGER
    })
}

watch(selectedStatistics, (newVal, oldVal) => {
    if (oldVal === Statistics.Yearly || newVal === Statistics.Yearly) {
        fetchStatistics()
    }
})
onMounted(() => {
    fetchStatistics()
})
const finalOrders = computed(() => {

    const allOrders = ordersDate.value.map(el => {
        return {
            week: getWeekNumberLocal(el.createdAt),
            month: getMonthName(el.createdAt),
            year: getFullyYear(el.createdAt),
            price: +el.total,
            machine: el.machine || null,
        }
    }).filter(el => {
        return el.month && el.year && el.week && isValidNumber(el.price) && el.machine && Object.keys(el.machine).length
    })

    const ordersGroupByMachine = Object.groupBy(allOrders, ({machine}) => machine._id);
    const ordersGroupByMachineArr = Object.entries(ordersGroupByMachine);
    const machinesData = {}
    const groupByTypes = ["week", "month", "year"]
    ordersGroupByMachineArr.forEach(([machine, allOrders]) => {
        if (allOrders?.length) {
            machinesData[machine] = Object.groupBy(allOrders, (el) => el[groupByTypes[selectedStatistics.value]])
            const st = Object.entries(machinesData[machine])
            st.forEach(([date, orders]) => {
                machinesData[machine][date] = orders.reduce()
            })
        }
    })
    return []
})
const labels = computed(() => {
    const labels = [t('months.jan'), t('months.feb'), t('months.mar'),
        t('months.apr'), t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'), t('months.sep')
        , t('months.oct'), t('months.nov'), t('months.dec')]
    const isRtl = store.rtlClass === 'rtl' ? true : false;
    return isRtl ? labels.reverse() : labels
})

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
            discrete: discrete.value,
        },
        labels: labels.value,
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
                offsetX: isRtl ? 5 : 0,
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
            opposite: isRtl,
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
const revenueSeries = computed(() => {
    const isRtl = store.rtlClass === 'rtl' ? true : false;
    const data = [
        {
            name: 'Machine1',
            data: [16600, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
        },
        {
            name: 'Machine2',
            data: [16500, 17500, 16200, 17300, 1000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
        },
    ]

    return isRtl ? data.map(el => {
        return {...el, data: el.data.reverse()}
    }) : data
})
const discrete = computed(() => {
    return revenueSeries.value.map((el, index) => {
        const maxNumber = Math.max(...el.data);
        const IndexOfMaxNumber = el.data.findIndex(el => el === maxNumber)
        return {
            seriesIndex: index,
            dataPointIndex: IndexOfMaxNumber,
            fillColor: index === 0 ? '#1b55e2' : '#e7515a',
            strokeColor: 'transparent',
            size: 7,

        }
    })
})

</script>
