<template>
    <div :class="{'has-error':!!error}">
        <slot></slot>
        <div class="min-h-[32px] py-[8px] min-w[1px] overflow-hidden">
            <Transition name="error" mode="out-in">
                              <span v-if="!!error" class="text-danger block font-normal text-[12px] leading-[16px] break-all text-wrap hyphens-auto">
                                {{ error }}
                              </span>
            </Transition>
        </div>
    </div>
</template>
<script setup lang="ts">
interface props{
    error:string | undefined | null
}
defineProps<props>()
</script>

