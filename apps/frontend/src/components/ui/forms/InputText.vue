<template>
    <div :class="{'has-error':errorMessage,'has-success':meta.dirty && meta.valid}">
        <label :for="name" v-if="!!fieldLabel">{{fieldLabel}}<span v-if="requierd" class="text-danger mx-1">*</span></label>
        <input  class="form-input ltr:text-left rtl:text-right"
               :type="type || 'text'"
               v-model.trim="value"
               @change="handleChange"
               @blur="handleBlur($event,true)"
                :id="name"
                :placeholder="placeholder"
                v-if="!textArea"
        />
        <textarea  :id="name" rows="3" v-model.trim="textareaValue" class="form-textarea" :placeholder="placeholder" v-else></textarea>
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
    type?:'text' | 'number' | 'tel' | 'password',
    fieldLabel?:string,
    placeholder?:string,
    requierd?: boolean;
    textArea?:boolean
}
const data = defineProps<props>()
import { useField } from 'vee-validate';
const { handleChange, value, handleBlur, errorMessage, meta } = useField(() => data.name,undefined);

//@ts-ignore
const textareaValue: string = data.textArea? value : undefined ;
</script>

