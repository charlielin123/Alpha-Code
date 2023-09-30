<script setup lang="ts"></script>

<template>
  <div class="wrap">

    <div class="loadingContainer">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/loading.scss';
.wrap{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(128, 128, 128, 0.4);
  // top: 0;
  // left: 0;
  z-index: 100;
}
</style>
