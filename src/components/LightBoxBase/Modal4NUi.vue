<script setup lang="ts">
import { ref } from 'vue';
import LightBoxBase from './LightBoxBase.vue';
import { NButton, NSpace, NEl, useThemeVars } from 'naive-ui';
const theme = useThemeVars();

const lightBox = ref();
</script>

<template>
  <LightBoxBase
    dis_close_btn
    ref="lightBox"
    :style="{ backgroundColor: theme.modalColor, color: theme.textColor1 }"
  >
    <template #header><slot name="header"></slot></template>
    <template #body><slot name="body"></slot></template>
    <template #footer>
      <NSpace>
        <slot name="footer"></slot>

        <n-button @click="lightBox.close()">關閉</n-button>
      </NSpace>
    </template>
  </LightBoxBase>
</template>

<style lang="scss" scoped></style>
