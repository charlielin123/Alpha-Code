<script setup lang="ts">
import { provide, ref } from 'vue';
import rootVue from './views/root.vue';
import { NConfigProvider, type GlobalTheme, darkTheme } from 'naive-ui';
const theme = ref<GlobalTheme | null>(darkTheme);
provide('theme', theme);
</script>

<template>
  <n-config-provider :theme="theme">【
    <rootVue />
    <MessageUtil />
  </n-config-provider>
</template>

<style lang="scss"></style>
