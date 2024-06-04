<template>
    <div>
        <TheBreadcrumbs :current-location="$t('usersPages.addUser')"/>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('usersPages.addNewUser') }}</h5>
            </div>
            <form @submit="onSubmit" class="pt-5 pb-10">
                <div class="grid grid-cols-4 sm:grid-cols-7 gap-4">
                    <input-text class="col-span-2" name="firstName" :field-label="$t('fields.firstName')" requierd
                                :placeholder="$t('placeHolders.enterFirstName')"/>
                    <input-text class="col-span-2" name="lastName" :field-label="$t('fields.lastName')" requierd
                                :placeholder="$t('placeHolders.enterLastName')"/>
                    <input-text class="col-span-2" name="email" :field-label="$t('fields.email')" requierd
                                :placeholder="$t('placeHolders.enterEmail')"/>
                    <switch-input name="active"  :field-label="$t('fields.status')"/>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <input-text type="tel" name="phoneNumber" :field-label="$t('fields.phoneNo')" requierd
                                :placeholder="$t('placeHolders.enterPhoneNo')"/>
                    <input-text type="password" name="password" :field-label="$t('fields.password')" requierd
                                :placeholder="$t('placeHolders.enterPassword')"/>
                    <input-select :options="rulesOptions"  name="role" :field-label="$t('fields.role')" requierd
                                :placeholder="$t('placeHolders.selectRole')"/>
                    <input-text name="businessName" :field-label="$t('fields.businessName')"
                                :placeholder="$t('placeHolders.enterBusinessName')"/>
                </div>
                <submit-button :label="$t('usersPages.addUser')" :loading="loading">
                    <template #icon="{classes}">
                        <icon-menu-users-group class="group-hover:!text-primary shrink-0" :class="classes"/>
                    </template>
                </submit-button>
            </form>

        </div>
    </div>
</template>
<script setup lang="ts">
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import {CreateUserDto} from "@frontend/api-sdk"
import {useForm} from 'vee-validate'
import {toTypedSchema} from "@vee-validate/zod"
import {z} from 'zod'
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import IconMenuUsersGroup from '@/components/icon/icon-users-group.vue';
import {useUser} from "@/composables/users/use-user2"
const {loading,addEntity} = useUser({})
const {t} = useI18n()
const rulesOptions = computed(()=>[
    {text:t('roles.admin'),value:'admin'},
    {text:t('roles.supplier'),value:'supplier'}
]);

const schema2 = computed(() => toTypedSchema(
    z.object({
        active:z.boolean().default(true),
        email:z.string().min(1, {
            message: t('validations.required', {
                field: t('fields.email')
            })
        }).email({message:t('validations.email')}).default(''),
        firstName:z.string().min(1, {
            message: t('validations.required', {
                field: t('fields.firstName')
            })
        }).default(''),
        lastName:z.string().min(1, {
            message: t('validations.required', {
                field: t('fields.lastName')
            })
        }).default(''),
        phoneNumber:z.string().min(1, {
            message: t('validations.required', {
                field: t('fields.phoneNo')
            })
        }).default(''),
        businessName:z.string().optional().transform((val) => val === '' ? null : val),
        password:z.string().min(1, {
            message: t('validations.required', {
                field: t('fields.password')
            })
        }).default(''),
        role:z.string().default('supplier')
    })
))
const {handleSubmit,resetForm} = useForm<CreateUserDto>({
    validationSchema: schema2
})
const onSubmit = handleSubmit(values => {
    addEntity(values,resetForm)
},()=>{})
</script>
