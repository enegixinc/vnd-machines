<template>
    <div class="mb-5">
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li>
                <router-link :to="{name:'home'}"  class="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                    <icon-home class="w-4 h-4" />
                </router-link>
            </li>
            <li class="before:content-['/'] before:px-1.5"><a href="javascript:;">Components</a></li>
            <li class="before:content-['/'] before:px-1.5">
                <a href="javascript:;" class="text-black dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">UI Kit</a>
            </li>
        </ol>
    </div>
</template>
<script setup lang="ts">
import IconHome from '@/components/icon/icon-home.vue';
</script>
