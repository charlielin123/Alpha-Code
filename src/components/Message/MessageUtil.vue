<script setup lang="ts">
import { useMessage } from './index';
const { list } = useMessage();

const imgMapping:{[key:string]:{d:string,viewBox:string}} = {
  success: {
    d: 'M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58z',
    viewBox: '0 0 512 512',
  },
  error: {
    d: 'M2 16A14 14 0 1 0 16 2A14 14 0 0 0 2 16zm23.15 7.75L8.25 6.85a12 12 0 0 1 16.9 16.9zM8.24 25.16a12 12 0 0 1-1.4-16.89l16.89 16.89a12 12 0 0 1-15.49 0z',
    viewBox: '0 0 32 32',
  },
  warning: {
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    viewBox: '0 0 24 24',
  },
};
</script>

<template>
  <div class="messageBox">
    <template v-if="list.length > 0">
      <template v-for="item in list" :key="item.key">
        <div class="message" :class="item.type">
          <div class="icon" :class="item.type">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              :viewBox="imgMapping[item.type].viewBox"
            >
              <path :d="imgMapping[item.type].d" fill="currentColor"></path>
            </svg>
          </div>
          <div class="text">
            {{ item.message }}
          </div>
        </div>
      </template>
    </template>
  </div>
  <slot> </slot>
</template>

<style lang="scss" scoped>
.messageBox {
  position: fixed;
  height: 10rem;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 99999;
}
@keyframes out {
  from {
    opacity: 1;
  }
  to {
    transform: scale(0.99) translateY(-5rem);
    opacity: 0;
  }
}
.message {
  flex-shrink: 0;
  background-color: aliceblue;
  position: relative;
  border-radius: 0.5rem;
  min-width: 20rem;
  height: 2rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  &:first-child {
    animation: out ease-in-out 1.5s forwards;
  }
  &.success {
    background-color: rgba(133, 255, 186, 0.5);
  }
  &.error {
    background-color: rgba(255, 82, 82, 0.5);
  }
  &.warning {
    background-color: rgba(255, 255, 89, 0.5);
  }

  .icon {
    // width: 20px;
    height: 70%;
    margin-left: 0.2rem;
    aspect-ratio: 1/1;
    &.success {
      color: rgba(47, 255, 137);
    }
    &.error {
      color: rgba(255, 0, 0);
    }
    &.warning {
      color: rgba(255, 255, 0);
    }
    img,svg {
      vertical-align: baseline;
    }
  }
  .text {
    text-align: center;
    font-size: 100%;
    font-weight: 600;
    align-self: center;
    width: 80%;
  }
}
</style>
