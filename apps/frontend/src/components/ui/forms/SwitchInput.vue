<template>
    <div :class="{'has-error':errorMessage,'has-success':meta.dirty && meta.valid}">
        <label v-if="!!fieldLabel">{{fieldLabel}}<span v-if="requierd" class="text-danger mx-1">*</span></label>
        <label class="w-12 h-6 relative">
            <input
                type="checkbox"
                class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                :id="name"
                v-model="value"
                @change="handleChange"
                @blur="handleBlur($event,true)"
            />
            <span
                :for="name"
                class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"
            ></span>
        </label>
        <div class="min-h-[32px] py-[8px] min-w[1px] overflow-hidden">
            <Transition name="error" mode="out-in">
                              <span v-if="errorMessage" class="text-danger block font-normal text-[12px] leading-[16px] break-all text-wrap hyphens-auto">
                                {{ errorMessage }}
                              </span>
            </Transition>
        </div>
    </div>

</template>
<script setup lang="ts">
interface props{
    name:string,
    fieldLabel?:string,
    requierd?: boolean;
}
const data = defineProps<props>()
import { useField } from 'vee-validate';
const { handleChange, value, handleBlur, errorMessage, meta } = useField(() => data.name,undefined, {
        type: 'checkbox',
        checkedValue: true,
        uncheckedValue: false,
    });
</script>

