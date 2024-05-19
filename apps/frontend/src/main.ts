import { createApp } from 'vue';
import App from '@/app/App.vue';
// pinia store
import { createPinia } from 'pinia';
import router from '@/router';
// main app css
import '@/assets/css/app.css';

// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
//vue-meta
import { createHead } from '@vueuse/head';
// set default settings
import appSetting from '@/app-setting';
//vue-i18n
import i18n from '@/i18n';
// tippy tooltips
import VueTippy from 'vue-tippy';
// popper
import Popper from 'vue3-popper';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);

app.use(PerfectScrollbar);

const head = createHead();
app.use(head);

appSetting.init();

app.use(i18n);

app.use(
    VueTippy,
    // optional
    {
        directive: 'tippy',
        component: 'tippy',
        componentSingleton: 'tippy-singleton',
        defaultProps: {
            placement: 'top',
            allowHTML: true,
        },
    }
);

app.component('Popper', Popper);

app.mount('#app');

// //
