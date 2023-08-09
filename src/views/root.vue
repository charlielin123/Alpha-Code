<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import webHeader from '@/components/layout/webHeader.vue';
</script>

<template>
  <web-header />
  <div class="main">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
$main-color: #ccc;
$back-color: rgb(25, 25, 25, 0.9);
$back-color2: rgb(100, 100, 100, 0.8);
$back-color2-hover: rgb(100, 100, 100, 0.5);
$text-color: #ededed;
$header-height: 3rem;

.main {
  height: calc(100vh - $header-height);
  // width: calc(100vw - $rightSide-width);
}

.nav-item {
  color: $text-color;
  font-size: 1.2rem;
  padding: 1rem;
  cursor: pointer;
}
</style>
