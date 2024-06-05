<template>
    <div :class="{'has-error':errorMessage,'has-success':meta.dirty && meta.valid}">
        <label :for="name" v-if="!!fieldLabel">{{fieldLabel}}<span v-if="requierd" class="text-danger mx-1">*</span></label>
        <select class="form-select text-white-dark"
                @change="handleChange"
                @blur="handleBlur($event,true)"
                :id="name"
                :placeholder="placeholder"
                v-model="value">
            <option v-for="option in options" :key="`option.${option.value}`" :value="option.value">
                {{option.text}}
            </option>
        </select>
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
interface option{
    text:string,
    value:unknown
}
interface props{
    name:string,
    fieldLabel?:string,
    placeholder?:string,
    requierd?: boolean;
    options:option[]

}
const data = defineProps<props>()
import { useField } from 'vee-validate';
const { handleChange, value, handleBlur, errorMessage, meta } = useField(() => data.name,undefined);

</script>

