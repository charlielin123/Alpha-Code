<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import webHeader from '@/components/layout/webHeader.vue';
import ChatRoom from '@/components/LightBox/ChatRoom.vue';
import { ref } from 'vue';

const show = ref(false);
</script>

<template>
  <ChatRoom v-model="show"/>
  <web-header />
  <div class="main">
    <RouterView />
  </div>
  <button class="chatIcon" @click="show = !show">
    聊天
  </button>
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
  position: relative;
  // width: calc(100vw - $rightSide-width);
}
.chatIcon{
  cursor: pointer;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  border-radius: 50rem;
  aspect-ratio: 1/1;
  width: 3rem;
  background-color: #cccccc31;
  border: .2rem solid black;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-item {
  color: $text-color;
  font-size: 1.2rem;
  padding: 1rem;
  cursor: pointer;
}
</style>
