<script setup lang="ts">
import { NConfigProvider, darkTheme, type GlobalTheme } from 'naive-ui';
import { provide, ref, reactive } from 'vue';
import rootVue from './views/root.vue';
const theme = ref<GlobalTheme | null>(darkTheme);
provide('theme', theme);

</script>

<template>
  <n-config-provider :theme="theme">
    <rootVue />
    <MessageUtil />
  </n-config-provider>
</template>

<style lang="scss"></style>
