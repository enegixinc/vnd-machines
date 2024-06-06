<template>
    <div :class="{ 'has-error': errorMessage || endDateErrorMessage, 'has-success': (meta.dirty && meta.valid) || (endDateMeta.dirty && endDateMeta.valid) }">
        <label for="duration">{{ $t('fields.duration') }}<span v-if="requierd" class="text-danger mx-1">*</span></label>
        <flat-pickr id="duration" :placeholder="$t('placeHolders.enterTheContractDuration')" class="form-input" :config="rangeCalendar"></flat-pickr>
        <div class="min-h-[32px] py-[8px] min-w[1px] overflow-hidden">
            <Transition name="error" mode="out-in">
                <span
                    v-if="errorMessage || endDateErrorMessage"
                    class="text-danger block font-normal text-[12px] leading-[16px] break-all text-wrap hyphens-auto"
                >
                    {{ errorMessage || endDateErrorMessage }}
                </span>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useField } from 'vee-validate';
    import flatPickr from 'vue-flatpickr-component';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    import { useAppStore } from '@/stores/index';
    import { Arabic } from 'flatpickr/dist/l10n/ar.js';
    import { useI18n } from 'vue-i18n';

    interface props {
        startDate: string;
        endDate: string;
        requierd?: boolean;
    }
    const data = defineProps<props>();
    const { errorMessage, meta, resetField } = useField(() => data.startDate, undefined, {});
    const { errorMessage: endDateErrorMessage, meta: endDateMeta, resetField: endDateResetField } = useField(() => data.endDate, undefined, {});

    const { locale: currentLang } = useI18n();
    const store = useAppStore();
    const rangeCalendar = ref({
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        mode: 'range',
        position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
        locale: 'default',
        onChange: (selectedDates: Date[]) => {
            let startDate: string;
            let endDate: string;
            if (selectedDates.length === 2) {
                startDate = flatpickr.formatDate(selectedDates[0], 'Y-m-d H:i');
                endDate = flatpickr.formatDate(selectedDates[1], 'Y-m-d H:i');
            } else {
                startDate = flatpickr.formatDate(selectedDates[0], 'Y-m-d H:i');
                endDate = '';
            }
            resetField({
                value: startDate,
            });
            endDateResetField({
                value: endDate,
            });
        },
    });

    if (currentLang.value === 'eg') {
        //@ts-ignore
        rangeCalendar.value.locale = Arabic;
    }
    watch(currentLang, (newVal) => {
        if (newVal === 'eg') {
            //@ts-ignore
            rangeCalendar.value.locale = Arabic;
        } else {
            //@ts-ignore
            rangeCalendar.value.locale = 'default';
        }
    });
</script>
