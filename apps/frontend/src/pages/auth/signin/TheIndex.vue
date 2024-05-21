<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>
        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0"
            >
                <div
                    class="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]"
                >
                    <div
                        class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"
                    ></div>
                    <div class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                        <div  class="w-48 block lg:w-72 ms-10">
                            <img src="/assets/images/logo/vnd-allwhite.svg" alt="Logo" class="w-full" />
                        </div>
                        <div class="mt-24 hidden w-full max-w-[430px] lg:block">
                            <img src="/assets/images/auth/login.svg" alt="Cover Image" class="w-full" />
                        </div>
                    </div>
                </div>
                <div class="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                    <div class="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                        <div  class="w-28 block lg:hidden">
                            <img src="/assets/images/logo/vnd-logo-color.svg" alt="Logo" class="mx-auto w-full" />
                        </div>
                        <div class="dropdown ms-auto w-max">
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
                                <button
                                    type="button"
                                    class="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                >
                                    <div>
                                        <img :src="currentFlag" alt="image" class="h-5 w-5 rounded-full object-cover" />
                                    </div>
                                    <div class="text-base font-bold uppercase">{{ store.locale === 'eg'? 'ar' : store.locale }}</div>
                                    <span class="shrink-0">
                                        <icon-caret-down />
                                    </span>
                                </button>
                                <template #content="{ close }">
                                    <ul class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        <template v-for="item in store.languageList" :key="item.code">
                                            <li>
                                                <button
                                                    type="button"
                                                    class="w-full hover:text-primary"
                                                    :class="{ 'bg-primary/10 text-primary': i18n.locale === item.code }"
                                                    @click="changeLanguage(item), close()"
                                                >
                                                    <img
                                                        class="w-5 h-5 object-cover rounded-full"
                                                        :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                        alt=""
                                                    />
                                                    <span class="ltr:ml-3 rtl:mr-3">{{ $t(`languages.${item.name}`) }}</span>
                                                </button>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="w-full max-w-[440px] lg:mt-16">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">{{$t('authPages.signIn')}}</h1>
                            <p class="text-base font-bold leading-normal text-white-dark">{{$t('authPages.enterYourEmailAndPasswordToLogin')}}</p>
                        </div>
                        <form class="space-y-5 dark:text-white" @submit.prevent="onSubmit">
                            <div :class="{ 'has-error': runErrors.email}">
                                <label for="Email">{{ $t('fields.email') }}</label>
                                <div class="relative text-white-dark">
                                    <input id="Email" type="email"
                                           :placeholder="$t('placeHolders.enterEmail')"
                                           class="form-input ps-10 placeholder:text-white-dark"
                                           @input="runErrors.email=null"
                                           v-model.trim="form.email"
                                    />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-mail :fill="true" />
                                    </span>
                                </div>
                                <template v-if="runErrors.email">
                                    <p class="text-danger mt-1">{{ $t(runErrors.email) }}</p>
                                </template>
                            </div>
                            <div :class="{ 'has-error': runErrors.password}">
                                <label for="Password">{{ $t('fields.password') }}</label>
                                <div class="relative text-white-dark">
                                    <input id="Password"
                                           type="password"
                                           :placeholder="$t('placeHolders.enterPassword')"
                                           class="form-input ps-10 placeholder:text-white-dark"
                                           @input="runErrors.password=null"
                                           v-model="form.password"
                                    />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-lock-dots :fill="true" />
                                    </span>
                                </div>
                                <template v-if="runErrors.password">
                                    <p class="text-danger mt-1">{{ $t(runErrors.password) }}</p>
                                </template>
                            </div>
                            <div class="text-white-dark flex justify-end mt-2 text-sm font-semibold">
                                <router-link :to="{name:'password-reset'}">
                                    {{$t('authPages.forgetPassword')}}
                                </router-link>
                            </div>
                            <div>
                                <label class="flex cursor-pointer items-center">
                                    <input type="checkbox" v-model="form.rememberMe" class="form-checkbox bg-white dark:bg-black" />
                                    <span class="text-white-dark">{{ $t('authPages.rememberMe') }}</span>
                                </label>
                            </div>
                            <button type="submit" :disabled="loading" class="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] disabled:opacity-60">
                                <template v-if="loading">
                                    <icon-loader class="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
                                    {{ $t('wait') }}
                                </template>
                               <template v-else>
                                   {{ $t('authPages.signIn') }}
                               </template>

                            </button>
                        </form>
                    </div>
                    <p class="absolute bottom-6 w-full text-center dark:text-white">
                        <bdi>
                            © {{ new Date().getFullYear() }}. VND - Vending Machines System {{$t('allRightsReserved')}}.
                        </bdi>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, reactive,ref } from 'vue';
import { useI18n } from 'vue-i18n';
import appSetting from '@/app-setting';
import { useAppStore } from '@/stores/index';
import { useRouter } from 'vue-router';
import { useMeta } from '@/composables/use-meta';
import {vndClient} from "@/api"
import IconCaretDown from '@/components/icon/icon-caret-down.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconLockDots from '@/components/icon/icon-lock-dots.vue';
import {useUser} from "@/stores/user"
import { jwtDecode } from "jwt-decode"
import IconLoader from '@/components/icon/icon-loader.vue';
// use sweet alert local now
import Swal from 'sweetalert2';

useMeta({ title: 'Login' });
const router = useRouter();
const store = useAppStore();
const user = useUser();

// multi language
const i18n = reactive(useI18n());
const changeLanguage = (item: any) => {
    i18n.locale = item.code;
    appSetting.toggleLanguage(item);
};
const currentFlag = computed(() => {
    return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
});
const form = ref({
    email:'',
    password:'',
    rememberMe:true
});
interface errors {
    email:null | string,
    password:null | string
}
const runErrors = ref<errors>({
    email:null,
    password:null
});
const formInvalid = ref(false);
const loading = ref(false)
async function onSubmit(){
    runErrors.value={
        email:null,
        password:null
    };
    formInvalid.value=false
    if (!form.value.email || /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/.test(form.value.email)){
        runErrors.value.email = 'errors.pleaseEnterValidEmail'
        formInvalid.value=true
    }
    if (!form.value.password){
        runErrors.value.password = 'errors.passwordRequired'
        formInvalid.value=true
    }
    if (formInvalid.value){
        return
    }
    // handle request local now
    try{
        loading.value = true
        const res:any =await vndClient.auth.authControllerLogin({
            requestBody:{
                email:form.value.email,
                password:form.value.password
            }
        })
        const tokenDecode:any=jwtDecode(res.refreshToken);
        user.setUser({},res.accessToken,res.refreshToken,tokenDecode.exp,true,form.value.rememberMe)
        router.push({name:'users'})

    }catch (err:any){
        let msg= '';
      //   handl error cardintial for now
        if(err?.body?.statusCode === 404){
            msg = i18n.t('authPages.invalidEmailOrPassword');
        }else {
            msg = i18n.t('errors.errorHappened')
        }
        Swal.fire({
            icon: 'error',
            title: i18n.t('errors.ops'),
            text: msg,
            padding: '0',
          confirmButtonColor:'primary',
        });
    }finally {
        loading.value = false
    }

}
</script>
