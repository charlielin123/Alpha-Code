<script setup lang="ts">
import { NGradientText, useThemeVars } from 'naive-ui';

const nStyle = useThemeVars();
</script>

<template>
  <div class="Home">
    <div>
      <n-gradient-text size="10rem" type="primary" class="text-focus-in"> WelCome </n-gradient-text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Home {
  height: 100%;
  width: 100%;
  background: v-bind('nStyle.modalColor');
  div {
    h1 {
      font-size: 10rem;
    }
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/**
 * ----------------------------------------
 * animation text-focus-in
 * ----------------------------------------
 */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

.text-focus-in {
  -webkit-animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: text-focus-in 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
</style>
