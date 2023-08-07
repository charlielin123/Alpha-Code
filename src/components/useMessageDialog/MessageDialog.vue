<script setup lang="ts">
import { clear } from './index.js';
import { LightBoxBase } from '@/components';
import { isVNode, toRef, ref, computed } from 'vue';
const props = defineProps(['msgDialog', 'dialogFunctions', 'class', 'closeApp', 'disTitle']);
const lightbox = ref();
const msg = toRef(props.msgDialog, 'message');
const doButton1 = () => {
  props.dialogFunctions.button1Function(props.msgDialog.param1);
  if (props.dialogFunctions.button1Close) {
    close();
  }
};
const doButton2 = () => {
  props.dialogFunctions.button2Function(props.msgDialog.param2);
  if (props.dialogFunctions.button2Close) {
    close();
  }
};
const doButton3 = () => {
  props.dialogFunctions.button3Function(props.msgDialog.param3);
  if (props.dialogFunctions.button3Close) {
    close();
  }
};

const close = () => {
  if (lightbox.value) {
    lightbox.value?.close();
  }
};
const dialogSwitch = computed({
  get() {
    return props?.msgDialog?.show;
  },
  set() {
    clear();
    if (props.closeApp) props.closeApp();
  }
});
</script>

<template>
  <LightBoxBase
    v-model="dialogSwitch"
    ref="lightbox"
    dis_close_btn
    draggable
    resize
    :dis_title="disTitle"
  >
    <template #title v-if="msgDialog.title != ''">
      {{ msgDialog.title }}
    </template>

    <template #body>
      <div
        v-if="disTitle"
        style="height: 2rem; border-bottom: 1px solid #dee2e6; width: 100%; transform: scaleX(1.5)"
      ></div>
      <div class="messageDialog-body">
        <msg v-if="isVNode(msg)" />
        <div v-else>
          <p>
            {{ msgDialog.message }}
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        v-if="msgDialog.button1Label"
        class="btn"
        :class="msgDialog.button1Label == 'close' ? 'btn-secondary' : 'btn-primary'"
        @click="doButton1()"
      >
        {{ msgDialog.button1Label }}
      </button>
      <button
        v-if="msgDialog.button2Label"
        class="btn"
        :class="msgDialog.button2Label == 'close' ? 'btn-secondary' : 'btn-primary'"
        @click="doButton2()"
      >
        {{ msgDialog.button2Label }}
      </button>
      <button
        v-if="msgDialog.button3Label"
        class="btn"
        :class="msgDialog.button3Label == 'close' ? 'btn-secondary' : 'btn-primary'"
        @click="doButton3()"
      >
        {{ msgDialog.button3Label }}
      </button>
    </template>
  </LightBoxBase>
</template>

<style lang="scss" scoped>
.btn {
  color: #fff;
  margin: 0.25rem;
  background-color: #6c757d;
  border-color: #6c757d;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  // background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.messageDialog-body {
  display: flex;
  align-items: center;
  min-width: 30rem;
  min-height: 6rem;
  max-height: 8rem;
  width: 8rem;
  overflow-x: hidden;
  padding-top: 1rem;
  position: relative;
  flex: 1 1 auto;
  p {
    text-align: center;
    word-wrap: break-word;
  }
}
</style>
