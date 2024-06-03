<template>

    <button type="submit" class="btn btn-primary  uppercase disabled:opacity-60 w-1/4" :disabled="loading">
        <template v-if="loading">
            <icon-loader class="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
            {{ $t('wait') }}
        </template>
        <template v-else>
            <slot classes="w-5 h-5 ltr:mr-1.5 rtl:ml-1.5" name="icon"></slot>
            {{label}}
        </template>
    </button>
</template>
<script setup lang="ts">
import IconLoader from "@/components/icon/icon-loader.vue";

interface props{
    loading:boolean,
    label:string
}
defineProps<props>()
</script>
