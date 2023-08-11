<script setup lang="ts">
import Modal4NUi from '../LightBoxBase/Modal4NUi.vue';
import { NGridItem, NGrid, NText, NInput, NSpace, NButton } from 'naive-ui';
</script>

<template>
  <Modal4NUi style="min-width: 60rem" body_style="padding: 0;" esc dis_footer>
    <template #header>
      <n-text>聊天</n-text>
    </template>
    <template #body>
      <n-grid class="container" x-gap="10">
        <n-grid-item span="8">
          <div class="add" style="width: 100%; padding: 0.2rem 1rem">
            <n-grid cols="5" x-gap="12">
              <n-grid-item span="4"
                ><n-input placeholder="新增聊天" style="width: 100%"
              /></n-grid-item>
              <n-grid-item span="1"> <n-button>+</n-button></n-grid-item>
            </n-grid>
          </div>
          <div class="memberList"></div
        ></n-grid-item>
        <n-grid-item span="16">
          <div class="main">
            <div class="history"></div>
            <div class="textArea" style="height: 20%">
              <n-input
                type="textarea"
                :resizable="false"
                style="height: 100%"
                placeholder="輸入訊息"
                @keydown.enter.prevent="console.log('asd')"
              />
            </div>
          </div>
        </n-grid-item>
      </n-grid>
    </template>
    <template #footer></template>
  </Modal4NUi>
</template>

<style lang="scss" scoped>
.container {
  height: 30rem;
  overflow: hidden;
}
.memberList {
  width: 100%;
  // height: 100%;
  // border: 5px solid;
  border-right: 2px solid;
}
.main {
  // border: 5px solid;
  width: 100%;
  height: 100%;
  .history {
    height: 80%;
    overflow: auto;
    // background-color: aqua;
  }
}
</style>
