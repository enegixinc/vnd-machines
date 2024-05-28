<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link :to="{name:'home'}" class="main-logo flex items-center shrink-0">
                        <div class="large-icon">
                            <img class="w-24 flex-none inline dark:hidden "
                                 src="/assets/images/logo/vnd-logo-color.svg"
                                 alt="logo-light-mode">
                            <img class="w-24 flex-none hidden dark:inline" src="/assets/images/logo/vnd-logo-white.svg"
                                 alt="logo-dark-mode">
                        </div>
                        <div class="hidden icon-image w-[38px] text-center">
                            <img class="w-5" src="/assets/images/logo/vnd-icon.svg"
                                 alt="logo-dark-mode">
                        </div>
                    </router-link>
                    <a
                        href="javascript:;"
                        class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
                        @click="store.toggleSidebar()"
                    >
                        <icon-carets-down class="m-auto rotate-90"/>
                    </a>
                </div>
                <perfect-scrollbar
                    :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }"
                    class="h-[calc(100vh-80px)] relative"
                >
                    <ul class="relative font-semibold space-y-0.5 p-4 py-0">
                        <li class="nav-item">
                            <router-link :to="{name:'home'}" class="group" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <icon-menu-home class="group-hover:!text-primary shrink-0"/>

                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('dashboard')
                                        }}</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <ul>
                                <li class="menu nav-item">
                                    <button
                                        type="button"
                                        class="nav-link group w-full"
                                        :class="{ active: activeDropdown === 'users' }"
                                        @click="activeDropdown === 'users' ? (activeDropdown = null) : (activeDropdown = 'users')"
                                    >
                                        <div class="flex items-center">
                                            <icon-menu-users-group class="group-hover:!text-primary shrink-0"/>

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('users')
                                                }}</span>
                                        </div>
                                        <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'users' }">
                                            <icon-caret-down/>
                                        </div>
                                    </button>
                                    <vue-collapsible :isOpen="activeDropdown === 'users'">
                                        <ul class="sub-menu text-gray-500">
                                            <li>
                                                <router-link :to="{name:'users'}" @click="toggleMobileMenu">{{
                                                    $t('links.mangeUsers')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{name:'suppliers'}" @click="toggleMobileMenu">{{
                                                    $t('usersPages.suppliers')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link :to="{name:'deletedUsers'}" @click="toggleMobileMenu">{{
                                                    $t('usersPages.deletedUsers')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link to="/supplierss" @click="toggleMobileMenu">{{
                                                    $t('usersPages.addUser')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link to="/users/profile" @click="toggleMobileMenu">{{
                                                    $t('usersPages.profile')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link to="/users/user-account-settings" @click="toggleMobileMenu">
                                                    {{ $t('usersPages.account_settings') }}
                                                </router-link>
                                            </li>
                                        </ul>
                                    </vue-collapsible>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <ul>
                                <li class="menu nav-item">
                                    <button
                                        type="button"
                                        class="nav-link group w-full"
                                        :class="{ active: activeDropdown === 'suppliers' }"
                                        @click="activeDropdown === 'suppliers' ? (activeDropdown = null) : (activeDropdown = 'suppliers')"
                                    >
                                        <div class="flex items-center">
                                            <icon-menu-users class="group-hover:!text-primary shrink-0"/>

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('usersPages.suppliers')
                                                }}</span>
                                        </div>
                                        <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'suppliers' }">
                                            <icon-caret-down/>
                                        </div>
                                    </button>
                                    <vue-collapsible :isOpen="activeDropdown === 'suppliers'">
                                        <ul class="sub-menu text-gray-500">
                                            <li>
                                                <router-link :to="{name:'suppliers'}" @click="toggleMobileMenu">{{
                                                        $t('links.manageSuppliers')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li class="menu nav-item">
                                                <button
                                                    type="button"
                                                    class="w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900"
                                                    @click="subActive === 'contracts' ? (subActive = null) : (subActive = 'contracts')"
                                                >
                                                    {{ $t('links.contracts') }}
                                                    <div class="ltr:ml-auto rtl:mr-auto" :class="{ 'rtl:rotate-90 -rotate-90': subActive !== 'contracts' }">
                                                        <icon-carets-down :fill="true" class="w-4 h-4" />
                                                    </div>
                                                </button>

                                                <vue-collapsible :isOpen="subActive === 'contracts'">
                                                    <ul :unmount="false" class="sub-menu text-gray-500">
                                                        <li @click="toggleMobileMenu">
                                                            <router-link :to="{name:'manage-contracts'}" >{{ $t('links.manageContracts') }}</router-link>
                                                        </li>
                                                        <li @click="toggleMobileMenu">
                                                            <router-link :to="{name:'deletedContracts'}" >{{ $t('links.deletedContracts') }}</router-link>
                                                        </li>
                                                        <li @click="toggleMobileMenu">
                                                            <router-link to="/pages/error500" >{{ $t('links.newContract') }}</router-link>
                                                        </li>

                                                    </ul>
                                                </vue-collapsible>
                                            </li>
                                        </ul>
                                    </vue-collapsible>
                                </li>
                            </ul>
                        </li>
                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden"/>
                            <span>{{ $t('headings.machinesAndProducts') }}</span>
                        </h2>
                        <li class="menu nav-item">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'machines' }"
                                @click="activeDropdown === 'machines' ? (activeDropdown = null) : (activeDropdown = 'machines')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-apps class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('links.machines')
                                        }}</span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'machines' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'machines'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/datatables/basic" @click="toggleMobileMenu">{{ $t('links.manageMachines') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/datatables/advanced" @click="toggleMobileMenu">{{ $t('links.newMachine') }}</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>
                        <li class="menu nav-item">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'products' }"
                                @click="activeDropdown === 'products' ? (activeDropdown = null) : (activeDropdown = 'products')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-box class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('links.products')
                                        }}</span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'products' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'products'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link :to="{name:'manageProducts'}" @click="toggleMobileMenu">{{ $t('links.manageProducts') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'deletedProducts'}" @click="toggleMobileMenu">{{ $t('links.deletedProducts') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/datatables/advanced3" @click="toggleMobileMenu">{{ $t('links.newProducts') }}</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>
                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden"/>
                            <span>{{ $t('headings.categoriesAndBrands') }}</span>
                        </h2>
                        <li class="menu nav-item">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'categories' }"
                                @click="activeDropdown === 'categories' ? (activeDropdown = null) : (activeDropdown = 'categories')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-layout-grid class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('links.categories')
                                        }}</span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'categories' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'categories'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link :to="{name:'manageCategories'}" @click="toggleMobileMenu">{{ $t('links.manageCategories') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'deletedCategories'}" @click="toggleMobileMenu">{{ $t('links.deletedCategories') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/datatables/advanced12" @click="toggleMobileMenu">{{ $t('links.newCategories') }}</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>
                        <li class="menu nav-item">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'brands' }"
                                @click="activeDropdown === 'brands' ? (activeDropdown = null) : (activeDropdown = 'brands')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-tag class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('links.brands')
                                        }}</span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'brands' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'brands'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/datatables/basic21" @click="toggleMobileMenu">{{ $t('links.manageBrands') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/datatables/advanced21" @click="toggleMobileMenu">{{ $t('links.deletedBrands') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/datatables/advanced31" @click="toggleMobileMenu">{{ $t('links.newBrands') }}</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>
                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden"/>
                            <span>{{ $t('headings.requestsAndReports') }}</span>
                        </h2>
                        <li class="menu nav-item">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'requests' }"
                                @click="activeDropdown === 'requests' ? (activeDropdown = null) : (activeDropdown = 'requests')"
                            >
                                <div class="flex items-center">
                                    <icon-menu-notes-edit class="group-hover:!text-primary shrink-0" />
                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('links.requests')
                                        }}</span>
                                </div>
                                <div :class="{ 'rtl:rotate-90 -rotate-90': activeDropdown !== 'requests' }">
                                    <icon-caret-down />
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'requests'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link to="/datatables/basic123" @click="toggleMobileMenu">{{ $t('links.manageRequests') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link to="/datatables/advanced123" @click="toggleMobileMenu">{{ $t('links.createRequest') }}</router-link>
                                    </li>

                                </ul>
                            </vue-collapsible>
                        </li>
                        <li class="nav-item">
                            <router-link to="/reports" class="group" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <icon-menu-bar-chart class="group-hover:!text-primary shrink-0"/>

                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('links.reports')
                                        }}</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';

import {useAppStore} from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';

import IconCaretsDown from '@/components/icon/icon-carets-down.vue';

import IconMinus from '@/components/icon/icon-minus.vue';

import IconCaretDown from '@/components/icon/icon-caret-down.vue';

import IconMenuTag from '@/components/icon/icon-tag.vue'
import IconMenuNotesEdit from '@/components/icon/icon-notes-edit.vue';
import IconMenuBarChart from '@/components/icon/icon-bar-chart.vue';
import IconMenuBox from '@/components/icon/icon-box.vue';
import IconMenuLayoutGrid from '@/components/icon/icon-layout-grid.vue';
import IconMenuUsersGroup from '@/components/icon/icon-users-group.vue';
import IconMenuUsers from '@/components/icon/icon-users.vue';
import IconMenuHome from '@/components/icon/icon-home.vue';
import IconMenuApps from "@/components/icon/menu/icon-menu-apps.vue";
const store = useAppStore();
const activeDropdown: any = ref('');
const subActive: any = ref('');

onMounted(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const ul: any = selector.closest('ul.sub-menu');
        if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
            if (ele.length) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        }
    }
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
