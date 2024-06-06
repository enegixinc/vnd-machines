<template>
    <div>
        <TheBreadcrumbs :current-location="$t('links.newContract')" />
        <div class="panel pb-0 mt-6">
            <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ $t('links.newContract') }}</h5>
            </div>
            <form @submit="onSubmit" class="pt-5 pb-10">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-text
                        name="feePerSale"
                        type="number"
                        :field-label="$t('fields.feePerSale')"
                        :placeholder="$t('placeHolders.enterFeePerSale')"
                        requierd
                    />
                    <connect-supplier name="supplier._id" requierd />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input-select
                        :options="feeType"
                        name="feeType"
                        :field-label="$t('fields.feeType')"
                        requierd
                        :placeholder="$t('placeHolders.selectFeeType')"
                    />
                    <input-select :options="status" name="status" :field-label="$t('fields.status')" requierd :placeholder="$t('placeHolders.selectStatus')" />
                </div>
                <div class="grid grid-cols-1">
                    <date-range-input end-date="endDate" start-date="startDate" requierd />
                </div>
                <div class="grid grid-cols-1">
                    <input-text
                        name="description"
                        text-area
                        requierd
                        :field-label="$t('fields.description')"
                        :placeholder="$t('placeHolders.enterDescription')"
                    />
                </div>
                <submit-button :label="$t('contractsPages.addContract')" :loading="loading" />
            </form>
            <div class="pb-5"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import TheBreadcrumbs from '@/components/ui/TheBreadcrumbs.vue';
    import { CreateContractDto } from '@frontend/api-sdk';
    import { useForm } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/zod';
    import { z } from 'zod';
    import { computed } from 'vue';
    import { useContract } from '@/composables/contracts/use-contracts';

    const { loading, addEntity, t } = useContract({});
    const feeType = computed(() => [
        { text: t('feeType.fixed'), value: 'fixed' },
        { text: t('feeType.percentage'), value: 'percentage' },
    ]);
    const status = computed(() => [
        { text: t('status.active'), value: 'active' },
        { text: t('status.expired'), value: 'expired' },
        { text: t('status.terminated'), value: 'terminated' },
    ]);

    const schema2 = computed(() =>
        toTypedSchema(
            z.object({
                feePerSale: z
                    .number({
                        message: t('validations.number', {
                            field: t('fields.feePerSale'),
                        }),
                    })
                    .default(1),
                supplier: z.object({
                    _id: z
                        .string()
                        .min(1, {
                            message: t('validations.required', {
                                field: t('fields.supplier'),
                            }),
                        })
                        .default(''),
                }),
                feeType: z.string().default('percentage'),
                status: z.string().default('active'),
                description: z
                    .string()
                    .min(1, {
                        message: t('validations.required', {
                            field: t('fields.description'),
                        }),
                    })
                    .default(''),
                startDate: z
                    .string()
                    .min(1, {
                        message: t('validations.required', {
                            field: t('fields.duration'),
                        }),
                    })
                    .default(''),
                endDate: z
                    .string()
                    .min(1, {
                        message: t('validations.required', {
                            field: t('fields.duration'),
                        }),
                    })
                    .default(''),
            })
        )
    );
    const { handleSubmit, resetForm } = useForm<CreateContractDto>({
        validationSchema: schema2,
    });
    const onSubmit = handleSubmit(
        (values) => {
            addEntity(values, resetForm);
        },
        () => {}
    );
</script>
