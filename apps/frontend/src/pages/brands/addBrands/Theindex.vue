<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.newBrands')"/>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('brandsPages.addNewBrand') }}</h5>
            </div>
            <form @submit="onSubmit" class="pt-5 pb-10">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text name="name.ar"  :field-label="$t('fields.ar',{field:$t('fields.name')})"
                                :placeholder="$t('placeHolders.enterAR',{field:$t('fields.name')})"/>
                    <input-text name="name.en"  :field-label="$t('fields.en',{field:$t('fields.name')})"
                                :placeholder="$t('placeHolders.enterEn',{field:$t('fields.name')})"/>
                </div>
                <div class="grid grid-cols-1  gap-4">
                    <input-text  name="referTo"  :field-label="$t('fields.referTo')"
                                 :placeholder="$t('placeHolders.enterReferTo')"/>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <connect-supplier name="supplier._id"/>
                    <connect-category name="category._id"/>
                    <connect-brand name="brand._id"/>
                </div>
                <submit-button :label="$t('brandsPages.addNewBrandButton')" :loading="loading">
                    <template #icon="{classes}">
                        <icon-menu-tag class="group-hover:!text-primary shrink-0" :class="classes"/>
                    </template>
                </submit-button>
            </form>

        </div>
    </div>
    {{values}}
</template>
<script setup lang="ts">
import TheBreadcrumbs from "@/components/ui/TheBreadcrumbs.vue";
import {CreateBrandDto} from "@frontend/api-sdk"
import {useForm} from 'vee-validate'
import {toTypedSchema} from "@vee-validate/zod"
import {z} from 'zod'
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import IconMenuTag from '@/components/icon/icon-tag.vue'
import {useBrands} from "@/composables/brands/use-brands"
const {loading,addEntity} = useBrands({})
const {t} = useI18n()
const schema2 = computed(() => toTypedSchema(
    z.object({
        name:z.object({
            en:z.string().default(''),
            ar:z.string().default('')
        }),
        referTo:z.string().email({message:t('validations.email')}).or(z.literal('')).optional().default(''),
        logo:z.string().default('https://www.local.com/image.jpg'),
        picture:z.string().default('https://www.local.com/image.jpg'),
        suppliers:z.array(z.object({
            _id:z.string().default(''),
        })).default([{
            "_id": "6a909236-53f2-4727-b780-e41e115ee906"
        },{
            "_id": "6a909236-53f2-4727-b780-e41e115ee906"
        }]),
        categories:z.array(z.object({
            _id:z.string().default(''),
        })).default([{
            "_id": "6a909236-53f2-4727-b780-e41e115ee906"
        },{
            "_id": "6a909236-53f2-4727-b780-e41e115ee906"
        }]),
        products:z.array(z.object({
            _id:z.string().default(''),
        })).default([{
            "_id": "6a909236-53f2-4727-b780-e41e115ee906"
        },{
            "_id": "6a909236-53f2-4727-b780-e41e115ee906"
        }]),
        // ---------------
    })
))
const {handleSubmit,resetForm,values} = useForm<CreateBrandDto>({
    validationSchema: schema2
})
const onSubmit = handleSubmit(values => {
    addEntity(values,resetForm)
},()=>{})
</script>
