<template>
            <div class="flex items-center w-fit mx-auto">
                <button
                    type="button"
                    class="btn btn-outline-primary dark:btn-outline-dark p-0 w-[24px] h-[24px]"
                    @click="value--"
                >
                    <icon-minus class="w-[12px] h-[12px]"/>
                </button>
                <number-spinner v-model="value" :min="1" :step="1" :keyStep="1" class="form-input  px-1 py-1 rounded-none w-12 sm:w-16 !bg-transparent border-0 text-center" />
                <button
                    type="button"
                    class="btn btn-outline-primary dark:btn-outline-dark p-0 w-[24px] h-[24px]"
                    @click="value++"
                >
                    <icon-plus class="w-[12px] h-[12px]"/>
                </button>
            </div>


</template>
   <script setup lang="ts">
   import { NumberSpinner } from 'vue3-number-spinner';
   import IconMinus from '@/components/icon/icon-minus.vue';
   import IconPlus from '@/components/icon/icon-plus.vue';
   import { useField } from 'vee-validate';
   interface props {
       name: string;
   }
   const data = defineProps<props>();
   const {value} = useField(() => data.name, undefined);
   </script>
