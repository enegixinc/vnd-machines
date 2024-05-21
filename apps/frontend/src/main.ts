
import { createApp } from 'vue';
import App from '@/app/App.vue';

const app = createApp(App);

// pinia store
import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);
import {useUser} from "@/stores/user"
const user = useUser();
user.tryLogin()
import router from '@/router';
app.use(router);

// main app css
import '@/assets/css/app.css';

// perfect scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
app.use(PerfectScrollbar);

//vue-meta
import { createHead } from '@vueuse/head';
const head = createHead();
app.use(head);

// set default settings
import appSetting from '@/app-setting';
appSetting.init();

//vue-i18n
import i18n from '@/i18n';
app.use(i18n);


// tippy tooltips
import VueTippy from 'vue-tippy'
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
)

// popper
import Popper from 'vue3-popper';
app.component('Popper', Popper);

app.mount('#app');
