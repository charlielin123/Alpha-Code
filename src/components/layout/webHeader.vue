<script setup lang="ts">
import { h, inject, ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';
import Member from '@/components/header/Member.vue';
import type { GlobalTheme } from 'naive-ui/es/config-provider/src/interface';
import { darkTheme, NButton, NEl, NSwitch } from 'naive-ui';

const theme = inject<Ref<GlobalTheme | null>>('theme');

const navItem = ({ name, to }: { name: string; to: string }) => {
  return h(
    RouterLink,
    {
      class: 'nav-item',
      to: { name: to }
    },
    () => name
  );
};
const header = ref<HTMLElement>();

const func = () => {
  header?.value?.style.setProperty('--alpha-gray', 'red');
};
</script>

<template>
  <NEl tag="header" ref="header">
    <navItem name="Home" to="T1" />
    <NSwitch
      @update-value="
        () => {
          theme = theme ? null : darkTheme;
        }
      "
    >
      <template #checked>深色</template>
      <template #unchecked>淺色</template>
    </NSwitch>
    <Member />

  </NEl>
</template>

<style lang="scss" scoped>
$main-color: #ccc;
$back-color: rgb(25, 25, 25, 0.9);
$back-color2: rgb(100, 100, 100, 0.8);
$back-color2-hover: rgb(100, 100, 100, 0.5);
$text-color: #ededed;
$header-height: 3rem;

header {
  // background-color: var(--alpha-gray);
  background-color: var(--base-color);
  height: $header-height;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // padding: 0 1rem;
}

.nav-item {
  color: var(--text-color-2);
  font-size: 1.2rem;
  padding: 1rem;
  // background-color: var(--popover-color);
  cursor: pointer;
  a {
    text-decoration: none;
  }
}
</style>
