<script setup lang="ts">
import { h } from 'vue';
import { RouterLink } from 'vue-router';
import Member from '@/components/header/Member.vue';
const navItem = ({ name, to }: { name: string; to: string }) => {
  return h(
    RouterLink,
    {
      class: 'nav-item',
      to: { name: to }
    },
    name
  );
};
</script>

<template>
  <header>
    <navItem name="Home" to="T1" />
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
  background-color: $back-color;
  height: $header-height;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // padding: 0 1rem;
}

.nav-item {
  color: $text-color;
  font-size: 1.2rem;
  padding: 1rem;
  cursor: pointer;
  a{
    text-decoration: none;
  }
}
</style>
