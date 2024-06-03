import { createApp ,defineAsyncComponent} from 'vue';
import App from '@/app/App.vue';
// pinia store
import { createPinia } from 'pinia';
import { useUser } from '@/stores/user';
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
const user = useUser();
user.tryLogin();
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
const InputGroup = defineAsyncComponent(()=>import('@/components/ui/forms/InputGroup.vue'))
const InputText = defineAsyncComponent(()=>import('@/components/ui/forms/InputText.vue'))
const SwitchInput = defineAsyncComponent(()=>import('@/components/ui/forms/SwitchInput.vue'))
const SubmitButton = defineAsyncComponent(()=>import('@/components/ui/forms/SubmitButton.vue'))
app.component('input-group',InputGroup)
app.component('input-text',InputText)
app.component('switch-input',SwitchInput)
app.component('submit-button',SubmitButton)
app.mount('#app');

//
