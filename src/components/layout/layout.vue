<script setup lang="ts"></script>

<template>
  <header></header>
  <div class="rightSide"></div>
  <div class="main"></div>
</template>

<style lang="scss" scoped>
$main-color: #ccc;
$back-color: rgb(25, 25, 25, 0.9);
$back-color2: rgb(100, 100, 100, 0.8);
$back-color2-hover: rgb(100, 100, 100, 0.5);
$text-color: #ededed;
$header-height: 3rem;
$rightSide-width: 19rem;
header {
  background-color: $back-color;
  height: $header-height;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
}
.rightSide {
  height: 100%;
  width: $rightSide-width;
}

.main {
  height: calc(100vh - $header-height);
  width: calc(100vw - $rightSide-width);
}
</style>
