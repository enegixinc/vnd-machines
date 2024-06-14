<template>
    <div>
        <TheBreadcrumbs  :before-sub-title="$t('edit')" :current-location="id"/>
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('brandsPages.editBrand') }}</h5>
            </div>
            <form @submit="onSubmit" class="pt-5 pb-10">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="name.ar"
                        requierd
                        :field-label="$t('fields.ar', { field: $t('fields.name') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.name') })"
                    />
                    <input-text
                        name="name.en"
                        requierd
                        :field-label="$t('fields.en', { field: $t('fields.name') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.name') })"
                    />
                </div>
                <submit-button :label="$t('brandsPages.updateBrand')" :loading="loading">
                    <template #icon="{ classes }">
                        <icon-menu-tag class="group-hover:!text-primary shrink-0" :class="classes" />
                    </template>
                </submit-button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import TheBreadcrumbs from '@/components/ui/TheBreadcrumbs.vue';
import { CreateBrandDto } from '@frontend/api-sdk';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import {computed, watch} from 'vue';
import IconMenuTag from '@/components/icon/icon-tag.vue';
import { useBrands } from '@/composables/brands/use-brands';
interface props {
    id: string;
}
const pageProps = defineProps<props>();
const { loading, getOneEntity, t,handleEmptyLang, cleanResource, updateEntity } = useBrands({});

const schema2 = computed(() =>
    toTypedSchema(
        z.object({
            name: z.object({
                en: z
                    .string()
                    .min(1, {
                        message: t('validations.required', {
                            field: t('fields.en', { field: t('fields.name') }),
                        }),
                    })
                    .default(''),
                ar: z
                    .string()
                    .min(1, {
                        message: t('validations.required', {
                            field: t('fields.ar', { field: t('fields.name') }),
                        }),
                    })
                    .default(''),
            }),
            logo: z.string().default('https://www.local.com/image.jpg'),
            picture: z.string().default('https://www.local.com/image.jpg'),
        })
    )
);
const { handleSubmit, resetForm, setValues, values:allValues  } = useForm<CreateBrandDto>({
    validationSchema: schema2,
});

const onSubmit = handleSubmit(
    (values) => {
        const id = allValues._id;
        const filledData = handleEmptyLang(values);
        setValues(filledData);
        const cleanedData = cleanResource(filledData);
        updateEntity({
            id:id,
            requestBody:{
                name:cleanedData.name,
                logo:cleanedData.logo||null,
                picture:cleanedData.picture||null
            }
        },t('brandsPages.TheBrandHasBeenSuccessfullyUpdated'))
    },
    () => {}
);
getOneEntity(
    {
        id: pageProps.id,

    },
    resetForm
);
watch(pageProps, (newVal) => {
    getOneEntity(
        {
            id: newVal.id,
        },
        resetForm
    );
});
</script>
