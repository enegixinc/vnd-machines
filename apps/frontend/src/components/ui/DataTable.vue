<template>
    <div>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Table 2</h5>
                <div class="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                    <div class="dropdown">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="0" class="align-middle">
                            <button
                                type="button"
                                class="flex items-center border font-semibold border-[#e0e6ed] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            >
                                <span class="ltr:mr-1 rtl:ml-1">Columns</span>
                                <icon-caret-down class="w-5 h-5" />
                            </button>
                            <template #content>
                                <ul class="whitespace-nowrap">
                                    <template v-for="(col, i) in cols" :key="i">
                                        <li>
                                            <div class="flex items-center px-4 py-1">
                                                <label class="cursor-pointer mb-0">
                                                    <input
                                                        type="checkbox"
                                                        class="form-checkbox"
                                                        :id="`chk-${i}`"
                                                        :value="col.field"
                                                        @change="col.hide = !$event?.target?.checked"
                                                        :checked="!col.hide"
                                                    />
                                                    <span :for="`chk-${i}`" class="ltr:ml-2 rtl:mr-2">{{ col.title }}</span>
                                                </label>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                    <div>
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>
            </div>

            <div class="datatable">
                <vue3-datatable
                    :rows="rows"
                    :columns="cols"
                    :totalRows="rows?.length"
                    :sortable="true"
                    sortColumn="id"
                    :stickyFirstColumn="true"
                    :stickyHeader="true"
                    :columnFilter="true"
                    :search="search"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
'
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180">
<path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'
                >
                    <template #firstName="data">
                        <div class="flex items-center w-max">
                            <img
                                class="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover"
                                :src="`https://i.pravatar.cc/200?u${data.value.firstName} ${data.value.lastName}`"
                            />
                            {{ data.value.firstName + ' ' + data.value.lastName }}
                        </div>
                    </template>
                    <template #age="data">
                        <div class="w-4/5 min-w-[100px] h-2.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                            <div
                                class="h-2.5 rounded-full rounded-bl-full text-center text-white text-xs"
                                :class="`bg-${randomColor()}`"
                                :style="`width:${data.value.age}%`"
                            ></div>
                        </div>
                    </template>
                    <template #dob="data">
                        {{ formatDate(data.value.dob) }}
                    </template>
                    <template #action>
                        <div class="flex items-center">
                            <div>
                                <button type="button" class="ltr:mr-2 rtl:ml-2" v-tippy="'Edit'">
                                    <icon-pencil />
                                </button>
                            </div>
                            <div>
                                <button type="button" v-tippy="'Delete'">
                                    <icon-trash-lines />
                                </button>
                            </div>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useAppStore } from '@/stores/index';
    import IconPencil from '@/components/icon/icon-pencil.vue';
    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconCaretDown from '@/components/icon/icon-caret-down.vue';
    import { vndClient } from '@/api';

    const store = useAppStore();
    const search = ref('');
    const rows = ref<any[]>([]);

    onMounted(() => {
        vndClient.users.getMany().then((res) => {
            rows.value = res.data;
        });
    });

    const cols =
        ref([
            { field: 'id', title: 'id', hide: false, isUnique: true, filter: false },
            { field: 'firstName', title: 'Name', hide: false },
            { field: 'age', title: 'Progress', hide: false, type: 'number' },
            { field: 'company', title: 'Company', hide: false },
            { field: 'dob', title: 'Start Date', hide: false, type: 'date' }, //type for filter input
            { field: 'email', title: 'Email', hide: false },
            { field: 'phone', title: 'Phone No.', hide: false },
            { field: 'action', title: 'Action', sort: false, hide: false },
        ]) || [];

    const formatDate = (date) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const randomColor = () => {
        const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };
</script>
