<template>
    <div class='panel'>
        <div class='card-header border-0 pt-6 flex flex-row justify-between mb-5 gap-2'>
            <div class='relative'>
                <input
                    @input='search'
                    v-model='meta.keyword'
                    :placeholder="$t('dataTable.search')"
                    type='text'
                    class='form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent placeholder:tracking-widest'

                />
                <button type='button'
                        class='absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary'>
                    <icon-search class='mx-auto'/>
                </button>
                <button
                    type='button'
                    class='hover:opacity-80 transition-all duration-75 block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2'
                    :class="{'opacity-0 pointer-events-none':!meta.keyword}"
                    @click='meta.keyword = null'
                >
                    <icon-x-circle/>
                </button>
            </div>
            <div class='dropdown ltr:pr-1 rtl:pl-1'>
                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance='0'
                        class='align-middle'>
                    <button
                        type='button'
                        class='flex items-center border font-semibold border-[#e0e6ed] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark'
                    >
                        <span class='ltr:mr-1 rtl:ml-1'>{{ $t('dataTable.columns') }}</span>
                        <icon-caret-down class='w-5 h-5'/>
                    </button>
                    <template #content>
                        <ul class='whitespace-nowrap'>
                            <template v-for='(col, i) in cols' :key='`COLCHECK.${i}`'>
                                <li>
                                    <div class='flex items-center px-4 py-1'>
                                        <label class='cursor-pointer mb-0'>
                                            <input
                                                type='checkbox'
                                                class='form-checkbox'
                                                :id='`col_check_-${i}`'
                                                v-model='col.visible'
                                                :disabled='col.locked'
                                            />
                                            <span :for='`col_check_-${i}`' class='ltr:ml-2 rtl:mr-2'>{{
                                                    col.title
                                                }}</span>
                                        </label>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </template>
                </Popper>
            </div>
        </div>
        <div class='table-responsive'>
            <table class="table-hover select-none text-nowrap !text-center">
                <thead>
                <tr>
                    <template v-for='(col,index) in cols' :key="`col.${index}`">
                        <th v-if='col?.visible' class='font-semibold uppercase '>
                            <template v-if='col.sortable'>
                                        <span class='cursor-pointer flex items-center gap-2 '
                                              @click='orderBy(col.field)'>
                                            {{ col.title }}
                                            <div class='w-4'>
                                            <span :class="{'opacity-50':!(meta?.order?.key === col.field)}">
                                                <svg
                                                    v-if="meta?.order?.dir === 'desc' && meta?.order?.key === col.field"
                                                    class='fill-primary' xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24" fill="currentColor"><path
                                                    d="M20 4V16H23L19 21L15 16H18V4H20ZM12 18V20H3V18H12ZM14 11V13H3V11H14ZM14 4V6H3V4H14Z"></path></svg>
                                                <svg v-else class='fill-primary' xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 24 24" fill="currentColor"><path
                                                    d="M19 3L23 8H20V20H18V8H15L19 3ZM14 18V20H3V18H14ZM14 11V13H3V11H14ZM12 4V6H3V4H12Z"></path></svg>
                                            </span>
                                            </div>
                                        </span>
                            </template>
                            <template v-else>{{ col.title }}</template>
                        </th>
                    </template>
                    <th v-if="!noActions" class="text-center">
                    </th>
                </tr>
                </thead>
                <tbody class='fw-bold text-gray-600'>
                <template v-if='loading'>
                    <td :colspan="cols.length">
                        <div class='flex justify-around loading'>
          <span>
           <icon-loader
               class='animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0'/>
            {{ $t('wait') }}
          </span>
                        </div>
                    </td>
                </template>
                <template v-else-if='!loading && !data.length'>
                    <td :colspan="cols.length">
                        <div class='flex justify-around loading'>
          <span class='flex items-center gap-2 '>
           <IconInfoCircle
               class='inline-block align-middle  shrink-0'/>
            {{ $t('dataTable.noData') }}
          </span>
                        </div>
                    </td>
                </template>
                <template v-else>
                    <tr v-for='item in finalData' :key='item.id'>
                        <template v-for='col in cols' :key='`item.${item.id}.${col.field}`'>
                            <td v-if='col.visible'>
                                <slot :name='col.field' :data='item.showValues[col.field]' :row='item'>
                                    {{ item.showValues[col.field] }}
                                </slot>
                            </td>
                        </template>
                        <td>
                            <slot name='actions' :row='item' v-if='!noActions'>
                                <div class="flex items-center">
                                    <div v-if="!hideShowDetails">
                                        <button type="button" class="ltr:mr-2 rtl:ml-2" v-tippy="$t('show')">
                                            <icon-eye/>
                                        </button>
                                    </div>
                                    <div v-if="!hideEdit">
                                        <button type="button" class="ltr:mr-2 rtl:ml-2" v-tippy="$t('edit')">
                                            <icon-pencil/>
                                        </button>
                                    </div>
                                    <div v-if="!hideDelete">
                                        <button
                                            type="button"
                                            v-tippy="$t('delete')"
                                            @click="emit('deleteRow', item._id)"
                                            :disabled="rowLoading === item._id || !!rowLoading"
                                        >
                                            <template v-if="rowLoading === item._id">
                                                <icon-loader class="animate-[spin_2s_linear_infinite]"/>
                                            </template>
                                            <template v-else>
                                                <icon-trash-lines/>
                                            </template>
                                        </button>
                                    </div>
                                </div>
                            </slot>
                        </td>
                    </tr>
                </template>

                </tbody>
            </table>
            <div class='dataTables_paginate paging_simple_numbers my-5 flex justify-between'
                 id='kt_table_users_paginate'>
                <div class='flex items-center gap-4'>
                    <div> {{ $t('dataTable.showing') }}</div>
                    <select class='form-select w-20' v-model='meta.perPage' @change='changePerPage'
                    >
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                        <option value=''>All</option>
                    </select>
                    <!--                            <div class='mx-1'> {{ $t('dataTable.results', { postProcess: 'interval', count: meta.perPage }) }}-->
                    <div> {{ $t('dataTable.results') }}
                    </div>

                </div>
                <div>
                    <ul class='pagination justify-content-end'>
                        <li class='paginate_button page-item previous' id='kt_table_users_previous'>
                            <a href='#' aria-controls='kt_table_users' data-dt-idx='0' tabindex='0'
                               class='page-link'
                               @click='prev()'>
                                <i class='previous'></i>
                            </a>
                        </li>
                        <li class='paginate_button page-item' v-for='index in this.lastPage' :key='index'
                            :class="meta.page==index? 'active':''">
                            <a href='#' aria-controls='kt_table_users' data-dt-idx='1' tabindex='0'
                               class='page-link'
                               @click='goToPage(index)'>{{ index }}</a>
                        </li>
                        <li class='paginate_button page-item next' id='kt_table_users_next'>
                            <a href='#' aria-controls='kt_table_users' data-dt-idx='4' tabindex='0'
                               class='page-link'
                               @click='next()'>
                                <i class='next'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

import {ref, computed} from 'vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconPencil from '@/components/icon/icon-pencil.vue';
import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconLoader from '@/components/icon/icon-loader.vue';
import {useAppStore} from '@/stores/index';

const store = useAppStore();

function getNestedValue(obj: { [key: string]: any }, path: string): unknown {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

const finalData = computed(() => {
    return data.value.map(el => {
        const newData = {}
        cols.value.forEach(col => {
            newData[col.field] = getNestedValue(el, col.trackBy);
        });
        return {...el, showValues: newData}
    })
});


// --------for row --------
const hideShowDetails = ref(false)
const hideEdit = ref(false)
const hideDelete = ref(false)
const emit = defineEmits(['changeServer', 'deleteRow']);
const rowLoading = ref(null)
// -------------


// testData
const cols = ref([
    {field: 'id', title: 'id', trackBy: "id", visible: true},
    {field: 'firstName', title: 'Name', trackBy: "firstName", visible: true},
    {field: 'age', title: 'Progress', trackBy: "age", visible: true, type: 'number'},
    {field: 'company', title: 'Company', trackBy: "company", visible: true, sortable: true},
    {field: 'dob', title: 'Start Date', trackBy: "dob", visible: true, sortable: true},
    {field: 'email', title: 'Email', trackBy: "email", visible: true},
    {field: 'phone', title: 'Phone No', trackBy: "phone", visible: true},
    {field: 'address', title: 'address', trackBy: "address.geo.lat", visible: true},
]);
const loading = ref(false);
const data = ref<{ [key: string]: unknown }[]>([
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Tillman',
        lastName: 'Forbes',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        address: {
            street: '240 Vandalia Avenue',
            city: 'Thynedale',
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: '+1 (969) 496-2892',
        isActive: false,
        age: 26,
        company: 'APPLIDECK',
    },
    {
        id: 4,
        firstName: 'Daisy',
        lastName: 'Whitley',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        address: {
            street: '350 Pleasant Place',
            city: 'Idledale',
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: '+1 (861) 564-2877',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
    {
        id: 5,
        firstName: 'Weber',
        lastName: 'Bowman',
        email: 'weberbowman@volax.com',
        dob: '1983-02-24',
        address: {
            street: '154 Conway Street',
            city: 'Broadlands',
            zipcode: 8131,
            geo: {
                lat: 54.501351,
                lng: -167.47138,
            },
        },
        phone: '+1 (962) 466-3483',
        isActive: false,
        age: 26,
        company: 'ORBAXTER',
    },
    {
        id: 6,
        firstName: 'Buckley',
        lastName: 'Townsend',
        email: 'buckleytownsend@orbaxter.com',
        dob: '2011-05-29',
        address: {
            street: '131 Guernsey Street',
            city: 'Vallonia',
            zipcode: 6779,
            geo: {
                lat: -2.681655,
                lng: 3.528942,
            },
        },
        phone: '+1 (884) 595-2643',
        isActive: true,
        age: 40,
        company: 'OPPORTECH',
    },
    {
        id: 7,
        firstName: 'Latoya',
        lastName: 'Bradshaw',
        email: 'latoyabradshaw@opportech.com',
        dob: '2010-11-23',
        address: {
            street: '668 Lenox Road',
            city: 'Lowgap',
            zipcode: 992,
            geo: {
                lat: 36.026423,
                lng: 130.412198,
            },
        },
        phone: '+1 (906) 474-3155',
        isActive: true,
        age: 24,
        company: 'GORGANIC',
    },
    {
        id: 8,
        firstName: 'Kate',
        lastName: 'Lindsay',
        email: 'katelindsay@gorganic.com',
        dob: '1987-07-02',
        address: {
            street: '773 Harrison Avenue',
            city: 'Carlton',
            zipcode: 5909,
            geo: {
                lat: 42.464724,
                lng: -12.948403,
            },
        },
        phone: '+1 (930) 546-2952',
        isActive: true,
        age: 24,
        company: 'AVIT',
    },
    {
        id: 9,
        firstName: 'Marva',
        lastName: 'Sandoval',
        email: 'marvasandoval@avit.com',
        dob: '2010-11-02',
        address: {
            street: '200 Malta Street',
            city: 'Tuskahoma',
            zipcode: 1292,
            geo: {
                lat: -52.206169,
                lng: 74.19452,
            },
        },
        phone: '+1 (927) 566-3600',
        isActive: false,
        age: 28,
        company: 'QUILCH',
    },
    {
        id: 10,
        firstName: 'Decker',
        lastName: 'Russell',
        email: 'deckerrussell@quilch.com',
        dob: '1994-04-21',
        address: {
            street: '708 Bath Avenue',
            city: 'Coultervillle',
            zipcode: 1268,
            geo: {
                lat: -41.550295,
                lng: -146.598075,
            },
        },
        phone: '+1 (846) 535-3283',
        isActive: false,
        age: 27,
        company: 'MEMORA',
    },
    {
        id: 11,
        firstName: 'Odom',
        lastName: 'Mills',
        email: 'odommills@memora.com',
        dob: '2010-01-24',
        address: {
            street: '907 Blake Avenue',
            city: 'Churchill',
            zipcode: 4400,
            geo: {
                lat: -56.061694,
                lng: -130.238523,
            },
        },
        phone: '+1 (995) 525-3402',
        isActive: true,
        age: 34,
        company: 'ZORROMOP',
    },
    {
        id: 12,
        firstName: 'Sellers',
        lastName: 'Walters',
        email: 'sellerswalters@zorromop.com',
        dob: '1975-11-12',
        address: {
            street: '978 Oakland Place',
            city: 'Gloucester',
            zipcode: 3802,
            geo: {
                lat: 11.732587,
                lng: 96.118099,
            },
        },
        phone: '+1 (830) 430-3157',
        isActive: true,
        age: 28,
        company: 'ORBOID',
    },
    {
        id: 13,
        firstName: 'Wendi',
        lastName: 'Powers',
        email: 'wendipowers@orboid.com',
        dob: '1979-06-02',
        address: {
            street: '376 Greenpoint Avenue',
            city: 'Elliott',
            zipcode: 9149,
            geo: {
                lat: -78.159578,
                lng: -9.835103,
            },
        },
        phone: '+1 (863) 457-2088',
        isActive: true,
        age: 31,
        company: 'SNORUS',
    },
    {
        id: 14,
        firstName: 'Sophie',
        lastName: 'Horn',
        email: 'sophiehorn@snorus.com',
        dob: '2018-09-20',
        address: {
            street: '343 Doughty Street',
            city: 'Homestead',
            zipcode: 330,
            geo: {
                lat: 65.484087,
                lng: 137.413998,
            },
        },
        phone: '+1 (885) 418-3948',
        isActive: true,
        age: 22,
        company: 'XTH',
    },
    {
        id: 15,
        firstName: 'Levine',
        lastName: 'Rodriquez',
        email: 'levinerodriquez@xth.com',
        dob: '1973-02-08',
        address: {
            street: '643 Allen Avenue',
            city: 'Weedville',
            zipcode: 8931,
            geo: {
                lat: -63.185586,
                lng: 117.327808,
            },
        },
        phone: '+1 (999) 565-3239',
        isActive: true,
        age: 27,
        company: 'COMTRACT',
    },
    {
        id: 16,
        firstName: 'Little',
        lastName: 'Hatfield',
        email: 'littlehatfield@comtract.com',
        dob: '2012-01-03',
        address: {
            street: '194 Anthony Street',
            city: 'Williston',
            zipcode: 7456,
            geo: {
                lat: 47.480837,
                lng: 6.085909,
            },
        },
        phone: '+1 (812) 488-3011',
        isActive: false,
        age: 33,
        company: 'ZIDANT',
    },
    {
        id: 17,
        firstName: 'Larson',
        lastName: 'Kelly',
        email: 'larsonkelly@zidant.com',
        dob: '2010-06-14',
        address: {
            street: '978 Indiana Place',
            city: 'Innsbrook',
            zipcode: 639,
            geo: {
                lat: -71.766732,
                lng: 150.854345,
            },
        },
        phone: '+1 (892) 484-2162',
        isActive: true,
        age: 20,
        company: 'SUREPLEX',
    },
    {
        id: 18,
        firstName: 'Kendra',
        lastName: 'Molina',
        email: 'kendramolina@sureplex.com',
        dob: '2002-07-19',
        address: {
            street: '567 Charles Place',
            city: 'Kimmell',
            zipcode: 1966,
            geo: {
                lat: 50.765816,
                lng: -117.106499,
            },
        },
        phone: '+1 (920) 528-3330',
        isActive: false,
        age: 31,
        company: 'DANJA',
    },
    {
        id: 19,
        firstName: 'Ebony',
        lastName: 'Livingston',
        email: 'ebonylivingston@danja.com',
        dob: '1994-10-18',
        address: {
            street: '284 Cass Place',
            city: 'Navarre',
            zipcode: 948,
            geo: {
                lat: 65.271256,
                lng: -83.064729,
            },
        },
        phone: '+1 (970) 591-3039',
        isActive: false,
        age: 33,
        company: 'EURON',
    },
    {
        id: 20,
        firstName: 'Kaufman',
        lastName: 'Rush',
        email: 'kaufmanrush@euron.com',
        dob: '2011-07-10',
        address: {
            street: '408 Kingsland Avenue',
            city: 'Beaulieu',
            zipcode: 7911,
            geo: {
                lat: 41.513153,
                lng: 54.821641,
            },
        },
        phone: '+1 (924) 463-2934',
        isActive: false,
        age: 39,
        company: 'ILLUMITY',
    },
    {
        id: 21,
        firstName: 'Frank',
        lastName: 'Hays',
        email: 'frankhays@illumity.com',
        dob: '2005-06-15',
        address: {
            street: '973 Caton Place',
            city: 'Dargan',
            zipcode: 4104,
            geo: {
                lat: 63.314988,
                lng: -138.771323,
            },
        },
        phone: '+1 (930) 577-2670',
        isActive: false,
        age: 31,
        company: 'SYBIXTEX',
    },
    {
        id: 22,
        firstName: 'Carmella',
        lastName: 'Mccarty',
        email: 'carmellamccarty@sybixtex.com',
        dob: '1980-03-06',
        address: {
            street: '919 Judge Street',
            city: 'Canby',
            zipcode: 8283,
            geo: {
                lat: 9.198597,
                lng: -138.809971,
            },
        },
        phone: '+1 (876) 456-3218',
        isActive: true,
        age: 21,
        company: 'ZEDALIS',
    },
    {
        id: 23,
        firstName: 'Massey',
        lastName: 'Owen',
        email: 'masseyowen@zedalis.com',
        dob: '2012-03-01',
        address: {
            street: '108 Seaview Avenue',
            city: 'Slovan',
            zipcode: 3599,
            geo: {
                lat: -74.648318,
                lng: 99.620699,
            },
        },
        phone: '+1 (917) 567-3786',
        isActive: false,
        age: 40,
        company: 'DYNO',
    },
    {
        id: 24,
        firstName: 'Lottie',
        lastName: 'Lowery',
        email: 'lottielowery@dyno.com',
        dob: '1982-10-10',
        address: {
            street: '557 Meserole Avenue',
            city: 'Fowlerville',
            zipcode: 4991,
            geo: {
                lat: 54.811546,
                lng: -20.996515,
            },
        },
        phone: '+1 (912) 539-3498',
        isActive: true,
        age: 36,
        company: 'MULTIFLEX',
    },
    {
        id: 25,
        firstName: 'Addie',
        lastName: 'Luna',
        email: 'addieluna@multiflex.com',
        dob: '1988-05-01',
        address: {
            street: '688 Bulwer Place',
            city: 'Harmon',
            zipcode: 7664,
            geo: {
                lat: -12.762766,
                lng: -39.924497,
            },
        },
        phone: '+1 (962) 537-2981',
        isActive: true,
        age: 32,
        company: 'PHARMACON',
    },
]);
const searchTimeOut = ref();
const selected = ref<(string | unknown)[]>([]);
const meta = ref({
    page: 1,
    perPage: 5,
    keyword: null,
    order: {
        key: '',
        dir: 'desc'
    }

});
const lastPage = ref();
const noActions = ref(false)

//  end test data
interface Props {
    url?: string,
    massActions?: boolean,
    data: { [key: string]: unknown }[],
}

// const props = defineProps<Props>()

function fetchData() {
    console.log('fetched we should export meta');
}

function search() {
    clearTimeout(searchTimeOut.value);
    searchTimeOut.value = setTimeout(function () {
        fetchData();
    }, 500);
}

function orderBy(col) {
    if (meta.value.order?.key === col) {
        meta.value.order.dir = (meta.value.order?.dir === 'desc') ? 'asc' : 'desc';
    } else {
        meta.value.order = {key: col, dir: 'asc'};
    }
    fetchData();
}

function prev() {
    selected.value = [];
    if (meta.value.page > 1) {
        meta.value.page = meta.value.page - 1;
    }
    fetchData();
}

function next() {
    selected.value = [];
    if (meta.value.page < lastPage.value) {
        meta.value.page = meta.value.page + 1;
    }
    fetchData();
}

function goToPage(page) {
    selected.value = [];
    meta.value.page = (page > lastPage.value) ? lastPage.value : page;
    fetchData();
}

function changePerPage() {
    meta.value.page = 1;
    fetchData();
}

function checkPageAndFetch() {
    selected.value = [];
    //check data length === 1
    //go to pervious page
    if (props.data.length === 1) {
        console.log('length matched');
        console.log('check page and fetch', lastPage.value - 1);
        goToPage(lastPage.value - 1);
    } else {
        console.log('length not matched');
        fetchData();
    }
}

</script>
<style scoped>
.loading {
    padding: 10em;
}

table {
    table-layout: auto !important;
}

th, td, thead th, tbody td, tfoot td, tfoot th {
    width: auto !important;
}


</style>
