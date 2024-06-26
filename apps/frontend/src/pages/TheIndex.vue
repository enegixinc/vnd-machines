<template>
    <div>
        <div class="grid xl:grid-cols-3 gap-6 mb-6">

            <TheSales/>
            <SalesByCategory/>
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
import SalesByCategory from "@/components/homepage/SalesByCategory.vue";

const store = useAppStore();


</script>
