<template>
    <div>
        <TheBreadcrumbs :before-sub-title="$t('edit')" :current-location="id" />

        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('productsPages.editProduct') }}</h5>
            </div>
            <form @submit="onSubmit" class="pt-5 pb-10">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="name.ar"
                        :field-label="$t('fields.ar', { field: $t('fields.name') })"
                        requierd
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.name') })"
                    />
                    <input-text
                        name="name.en"
                        :field-label="$t('fields.en', { field: $t('fields.name') })"
                        requierd
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.name') })"
                    />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text name="upc" :field-label="$t('fields.upc')" requierd :placeholder="$t('placeHolders.enterUpc')" />
                    <input-text name="barcode" :field-label="$t('fields.barcode')" requierd :placeholder="$t('placeHolders.enterBarcode')" />
                </div>
                <div class="grid grid-cols-4 sm:grid-cols-7 gap-4">
                    <input-text
                        class="col-span-2"
                        name="additionPrice"
                        type="number"
                        :field-label="$t('fields.additionPrice')"
                        :placeholder="$t('placeHolders.enterUpc')"
                    />
                    <input-text
                        class="col-span-2"
                        name="costPrice"
                        type="number"
                        :field-label="$t('fields.costPrice')"
                        :placeholder="$t('placeHolders.enterCostPrice')"
                    />
                    <input-text
                        class="col-span-2 sm:col-span-2"
                        name="price"
                        type="number"
                        :field-label="$t('fields.price')"
                        :placeholder="$t('placeHolders.enterCostPrice')"
                    />
                    <switch-input class="col-span-2 sm:col-span-1" name="pricePerKilo" :field-label="$t('fields.pricePerKilo')" />
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <input-text name="vatIndex" type="number" :field-label="$t('fields.vatIndex')" :placeholder="$t('placeHolders.enterVatIndex')" />
                    <input-text name="sortIndex" type="number" :field-label="$t('fields.sortIndex')" :placeholder="$t('placeHolders.enterSortIndex')" />
                    <input-text name="ageControl" type="number" :field-label="$t('fields.ageControl')" :placeholder="$t('placeHolders.enterAgeControl')" />
                    <input-text
                        name="virtualProduct"
                        type="number"
                        :field-label="$t('fields.virtualProduct')"
                        :placeholder="$t('placeHolders.enterVirtualProduct')"
                    />
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <input-text name="prodType" :field-label="$t('fields.prodType')" :placeholder="$t('placeHolders.enterProdType')" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <connect-supplier name="supplier._id" />
                    <connect-category name="category._id" />
                    <connect-brand name="brand._id" />
                </div>
                <div class="mb-5">
                    <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('productsPages.dimensions') }}</h5>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input-text name="dimension.width" type="number" :field-label="$t('fields.width')" :placeholder="$t('placeHolders.enterWidth')" />
                    <input-text name="dimension.height" type="number" :field-label="$t('fields.height')" :placeholder="$t('placeHolders.enterHeight')" />
                    <input-text name="dimension.length" type="number" :field-label="$t('fields.length')" :placeholder="$t('placeHolders.enterLength')" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="keyFeatures.ar"
                        :field-label="$t('fields.ar', { field: $t('fields.keyFeatures') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.keyFeatures') })"
                    />
                    <input-text
                        name="keyFeatures.en"
                        :field-label="$t('fields.en', { field: $t('fields.keyFeatures') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.keyFeatures') })"
                    />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="detail.ar"
                        text-area
                        :field-label="$t('fields.ar', { field: $t('fields.details') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.details') })"
                    />
                    <input-text
                        name="detail.en"
                        text-area
                        :field-label="$t('fields.en', { field: $t('fields.details') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.details') })"
                    />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="description.ar"
                        text-area
                        :field-label="$t('fields.ar', { field: $t('fields.description') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.description') })"
                    />
                    <input-text
                        name="description.en"
                        text-area
                        :field-label="$t('fields.en', { field: $t('fields.description') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.description') })"
                    />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="include.ar"
                        text-area
                        :field-label="$t('fields.ar', { field: $t('fields.include') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.include') })"
                    />
                    <input-text
                        name="include.en"
                        text-area
                        :field-label="$t('fields.en', { field: $t('fields.include') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.include') })"
                    />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="specification.ar"
                        text-area
                        :field-label="$t('fields.ar', { field: $t('fields.specification') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.specification') })"
                    />
                    <input-text
                        name="specification.en"
                        text-area
                        :field-label="$t('fields.en', { field: $t('fields.specification') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.specification') })"
                    />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="ingredients.ar"
                        text-area
                        :field-label="$t('fields.ar', { field: $t('fields.ingredients') })"
                        :placeholder="$t('placeHolders.enterAR', { field: $t('fields.ingredients') })"
                    />
                    <input-text
                        name="ingredients.en"
                        text-area
                        :field-label="$t('fields.en', { field: $t('fields.ingredients') })"
                        :placeholder="$t('placeHolders.enterEn', { field: $t('fields.ingredients') })"
                    />
                </div>
                <submit-button :label="$t('productsPages.updateProduct')" :loading="loading">
                    <template #icon="{ classes }">
                        <icon-menu-box class="group-hover:!text-primary shrink-0" :class="classes" />
                    </template>
                </submit-button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
    import TheBreadcrumbs from '@/components/ui/TheBreadcrumbs.vue';
    import { CreateProductDto } from '@frontend/api-sdk';
    import { useForm } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/zod';
    import { z } from 'zod';
    import { computed, onMounted, watch } from 'vue';
    import IconMenuBox from '@/components/icon/icon-box.vue';
    import { useProducts } from '@/composables/products/use-products';

    interface props {
        id: string;
    }
    const pageProps = defineProps<props>();
    const { loading, getOneEntity, t, handleEmptyLang, cleanResource, updateEntity } = useProducts({});
    const schema2 = computed(() =>
        toTypedSchema(
            z.object({
                upc: z
                    .string()
                    .min(1, {
                        message: t('validations.required', {
                            field: t('fields.upc'),
                        }),
                    })
                    .default(''),
                barcode: z
                    .string()
                    .min(1, {
                        message: t('validations.required', {
                            field: t('fields.barcode'),
                        }),
                    })
                    .default(''),
                additionPrice: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.additionPrice'),
                        }),
                    })
                    .default(0),
                costPrice: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.costPrice'),
                        }),
                    })
                    .default(0),
                price: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.price'),
                        }),
                    })
                    .default(0),
                pricePerKilo: z.boolean().default(true),
                prodType: z.string().nullish().default(''),
                sortIndex: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.sortIndex'),
                        }),
                    })
                    .default(0),
                vatIndex: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.vatIndex'),
                        }),
                    })
                    .default(0),
                virtualProduct: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.virtualProduct'),
                        }),
                    })
                    .default(0),
                ageControl: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.ageControl'),
                        }),
                    })
                    .default(0),
                dimension: z.object({
                    width: z
                        .number({
                            message: t('validations.number', {
                                field: t('fields.width'),
                            }),
                        })
                        .default(0),
                    height: z
                        .number({
                            message: t('validations.number', {
                                field: t('fields.height'),
                            }),
                        })
                        .default(0),
                    length: z
                        .number({
                            message: t('validations.number', {
                                field: t('fields.length'),
                            }),
                        })
                        .default(0),
                }).nullish(),
                name: z.object({
                    en: z.string().default(''),
                    ar: z.string().default(''),
                }).nullish(),
                detail: z.object({
                    en: z.string().default(''),
                    ar: z.string().default(''),
                }).nullish(),
                description: z.object({
                    en: z.string().default(''),
                    ar: z.string().default(''),
                }).nullish(),
                keyFeatures: z.object({
                    en: z.string().default(''),
                    ar: z.string().default(''),
                }).nullish(),
                include: z.object({
                    en: z.string().default(''),
                    ar: z.string().default(''),
                }).nullish(),
                specification: z.object({
                    en: z.string().default(''),
                    ar: z.string().default(''),
                }).nullish(),
                ingredients: z.object({
                    en: z.string().default(''),
                    ar: z.string().default(''),
                }).nullish(),
                supplier: z
                    .object({
                        _id: z.string().default(''),
                    })
                    .nullish(),
                category: z
                    .object({
                        _id: z.string().default(''),
                    })
                    .nullish(),
                brand: z
                    .object({
                        _id: z.string().default(''),
                    })
                    .nullish(),
            })
        )
    );
    const { handleSubmit, resetForm, setValues, values:allValues } = useForm<CreateProductDto>({
        validationSchema: schema2,
    });
    const onSubmit = handleSubmit(
        (values) => {
            const id = allValues._id;
            const filledData = handleEmptyLang(values);
            setValues(filledData);
            const cleanedData = cleanResource(filledData);

            updateEntity({
                id: id,
                requestBody: {
                    name: cleanedData.name??null,
                    price: cleanedData.price,
                    additionPrice: cleanedData.additionPrice,
                    ageControl: cleanedData.ageControl,
                    barcode: cleanedData.barcode??null,
                    brand: cleanedData.brand || null,
                    category: cleanedData.category || null,
                    costPrice: cleanedData.costPrice,
                    description: cleanedData.description??null,
                    detail: cleanedData.detail??null,
                    dimension: cleanedData.dimension??null,
                    include: cleanedData.include??null,
                    ingredients: cleanedData.ingredients??null,
                    keyFeatures: cleanedData.keyFeatures??null,
                    pricePerKilo: cleanedData.pricePerKilo,
                    prodType: cleanedData.prodType??null,
                    productPictures: cleanedData.productPictures??[],
                    productVideo: cleanedData.productVideo??null,
                    sortIndex: cleanedData.sortIndex,
                    specification: cleanedData.specification??null,
                    upc: cleanedData.upc??null,
                    supplier: cleanedData.supplier || null,
                    vatIndex: cleanedData.vatIndex,
                    virtualProduct: cleanedData.virtualProduct,
                },
            },t('productsPages.TheProductHasBeenSuccessfullyUpdated'));
        },
        ({errors}) => {console.log(errors)}
    );
    getOneEntity(
        {
            id: pageProps.id,
            join: ['supplier', 'category', 'brand'],
        },
        resetForm
    );
    onMounted(() => {
        console.log('i mounted');
    });

    watch(pageProps, (newVal) => {
        getOneEntity(
            {
                id: newVal.id,
                join: ['supplier||firstName', 'category||name', 'brand||name'],
            },
            resetForm
        );
    });
</script>
