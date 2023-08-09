<script setup lang="ts">
import { h, inject, ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';
import Member from '@/components/header/Member.vue';
import type { GlobalTheme } from 'naive-ui/es/config-provider/src/interface';
import { darkTheme, NButton, NEl, NSwitch,useThemeVars } from 'naive-ui';

const nStyle = useThemeVars();

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
  <header ref="header">
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
  </header>
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
  background-color: v-bind('nStyle.baseColor');
  height: $header-height;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: solid 2px v-bind('nStyle.primaryColor');
  box-shadow: v-bind('nStyle.boxShadow1');
}

.nav-item {
  color: v-bind('nStyle.textColor1');
  font-size: 1.2rem;
  padding: 1rem;
  // background-color: var(--popover-color);
  cursor: pointer;
  a {
    text-decoration: none;
  }
}
</style>
