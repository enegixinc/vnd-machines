<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
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
                                    <icon-menu-dashboard class="group-hover:!text-primary shrink-0"/>

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
                                            <icon-menu-users class="group-hover:!text-primary shrink-0"/>

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
                                                    $t('users')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link to="/suppliers" @click="toggleMobileMenu">{{
                                                    $t('usersPages.suppliers')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link to="/suppliers" @click="toggleMobileMenu">{{
                                                    $t('usersPages.deletedUsers')
                                                    }}
                                                </router-link>
                                            </li>
                                            <li>
                                                <router-link to="/suppliers" @click="toggleMobileMenu">{{
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
                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden"/>
                            <span>{{ $t('machine') }}</span>
                        </h2>

                        <li class="nav-item">
                            <ul>
<!--                                products-->
                                <li class="nav-item">
                                    <router-link to="/products" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">
                                            <icon-menu-chat class="group-hover:!text-primary shrink-0"/>

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('products')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
<!--                                categories-->
                                <li class="nav-item">
                                    <router-link to="/categories" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">
                                            <icon-menu-mailbox class="group-hover:!text-primary shrink-0"/>

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('categories')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
<!--                                brands-->
                                <li class="nav-item">
                                    <router-link to="/brands" class="group" @click="toggleMobileMenu">
                                        <div class="flex items-center">
                                            <icon-menu-todo class="group-hover:!text-primary shrink-0"/>

                                            <span
                                                class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                                    $t('brands')
                                                }}</span>
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
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
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue';
import IconMinus from '@/components/icon/icon-minus.vue';
import IconMenuChat from '@/components/icon/menu/icon-menu-chat.vue';
import IconMenuMailbox from '@/components/icon/menu/icon-menu-mailbox.vue';
import IconMenuTodo from '@/components/icon/menu/icon-menu-todo.vue';
import IconMenuNotes from '@/components/icon/menu/icon-menu-notes.vue';
import IconMenuScrumboard from '@/components/icon/menu/icon-menu-scrumboard.vue';
import IconMenuContacts from '@/components/icon/menu/icon-menu-contacts.vue';
import IconMenuInvoice from '@/components/icon/menu/icon-menu-invoice.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconMenuCalendar from '@/components/icon/menu/icon-menu-calendar.vue';
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements.vue';
import IconMenuCharts from '@/components/icon/menu/icon-menu-charts.vue';
import IconMenuWidgets from '@/components/icon/menu/icon-menu-widgets.vue';
import IconMenuFontIcons from '@/components/icon/menu/icon-menu-font-icons.vue';
import IconMenuDragAndDrop from '@/components/icon/menu/icon-menu-drag-and-drop.vue';
import IconMenuTables from '@/components/icon/menu/icon-menu-tables.vue';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables.vue';
import IconMenuForms from '@/components/icon/menu/icon-menu-forms.vue';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users.vue';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages.vue';
import IconMenuAuthentication from '@/components/icon/menu/icon-menu-authentication.vue';
import IconMenuDocumentation from '@/components/icon/menu/icon-menu-documentation.vue';
// --------new
import IconUser from "@/components/icon/icon-user.vue";
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
