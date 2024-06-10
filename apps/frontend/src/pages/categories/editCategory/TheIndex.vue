<template>
    <div>
        <TheBreadcrumbs :before-sub-title="$t('edit')" :current-location="id" />
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('categoriesPages.editCategory') }}</h5>
            </div>
            <form @submit="onSubmit" class="pt-5 pb-10">
                <div class="grid grid-cols-4 sm:grid-cols-7 gap-4">
                    <input-text
                        class="col-span-2"
                        name="name.ar"
                        requierd
                        :field-label="$t('fields.ar', { field: $t('fields.name') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.name') })"
                    />
                    <input-text
                        class="col-span-2"
                        name="name.en"
                        requierd
                        :field-label="$t('fields.en', { field: $t('fields.name') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.name') })"
                    />
                    <input-text
                        class="col-span-2"
                        name="sortIndex"
                        type="number"
                        :field-label="$t('fields.sortIndex')"
                        :placeholder="$t('placeHolders.enterSortIndex')"
                    />
                    <switch-input name="auto" :field-label="$t('fields.auto')" />
                </div>
                <submit-button :label="$t('categoriesPages.updateCategory')" :loading="loading">
                    <template #icon="{ classes }">
                        <icon-menu-layout-grid class="group-hover:!text-primary shrink-0" :class="classes" />
                    </template>
                </submit-button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import TheBreadcrumbs from '@/components/ui/TheBreadcrumbs.vue';
import { CreateCategoryDto } from '@frontend/api-sdk';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import {computed, watch} from 'vue';
import IconMenuLayoutGrid from '@/components/icon/icon-layout-grid.vue';
import { useCategories } from '@/composables/categories/use-categories';
interface props {
    id: string;
}
const pageProps = defineProps<props>();
const { loading, getOneEntity, t,handleEmptyLang, cleanResource, updateEntity } = useCategories({});

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
            sortIndex: z
                .number({
                    message: t('validations.number', {
                        field: t('fields.sortIndex'),
                    }),
                })
                .default(1),
            auto: z.boolean().default(true),
            categoryPicture: z.string().default('https://www.local.com/image.jpg'),
        })
    )
);
const { handleSubmit, resetForm, setValues, values:allValues } = useForm<CreateCategoryDto>({
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
                sortIndex:cleanedData.sortIndex,
                auto:cleanedData.auto,
                categoryPicture:cleanedData.categoryPicture||"https://www.local.com/image.jpg"
            }
        },t('categoriesPages.TheCategoryHasBeenSuccessfullyUpdated'))
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
