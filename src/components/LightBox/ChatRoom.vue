<script setup lang="ts">
import { reactive, ref } from 'vue';
import Modal4NUi from '../LightBoxBase/Modal4NUi.vue';
import { NGridItem, NGrid, NText, NInput, NSpace, NButton, useThemeVars } from 'naive-ui';
const nStyle = useThemeVars();
const messageList = reactive<{ message: string; avatar: string }[]>([]);
const fakeDate = [{ message: '你好', avatar: 'https://i2.bahamut.com.tw/baha_logo5.svg' }];
messageList.push(...fakeDate);
const inputMsg = ref('');
const sendMsg = () => {
  console.log(inputMsg.value);
  messageList.push({
    message: inputMsg.value,
    avatar: 'https://i2.bahamut.com.tw/baha_logo5.svg'
  });
  inputMsg.value = '';
};
</script>

<template>
  <Modal4NUi
    style="min-width: 60rem; min-height: 34rem; height: 34rem"
    body_style="padding: 0;"
    esc
    dis_footer
  >
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
          <div class="memberList"></div>
        </n-grid-item>
        <n-grid-item span="16">
          <div class="main">
            <div class="history">
              <template v-for="(item, index) in messageList">
                <n-space align="center">
                  <img
                    :src="item.avatar"
                    alt=""
                    style="width: 40px; height: 40px; border-radius: 50rem; background-color: #fff"
                  />
                  <div class="messageBg" :class="index % 2 == 0 ? 'test' : ''">
                    <n-text>{{ item.message }}</n-text>
                  </div>
                </n-space>
              </template>
            </div>
            <div class="textArea" style="height: 20%">
              <n-input
                type="textarea"
                :resizable="false"
                style="height: 100%"
                placeholder="輸入訊息"
                class="inputArea"
                v-model:value="inputMsg"
                @keydown.enter.prevent="sendMsg"
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
  height: 100%;
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
  position: relative;
  .history {
    height: 80%;
    overflow: auto;
    // background-color: aqua;
  }
}
.textArea {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}
.messageBg {
  // clip-path: polygon(10% 15%, 90% 15%, 90% 85%, 30% 85%, 0 100%, 10% 85%);  // padding: .5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  background-color: v-bind('nStyle.primaryColor');
  position: relative;
  margin: 1rem 0;
  
  &::after {
    --message-width: 2rem;
    --message-height: 2rem;
    position: absolute;
    clip-path: polygon(20% 70%, 50% 100%, 100% 100%);
    background-color: inherit;
    width: var(--message-width);
    height: var(--message-height);
    // top: -1.6667rem;
    left: -25px;
    top: calc(var(--message-height) * -5 / 6);
    left: calc(var(--message-width) / -2);
    content: '';
  }
}
</style>
