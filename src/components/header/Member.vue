<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import http from '@/compossible/Utils/http';
import { useThemeVars, NPopover, NSpace } from 'naive-ui';
import { useMessage } from '..';
const { showMessage } = useMessage();
const nStyle = useThemeVars();
const borderColor = computed(() => {
  return nStyle.value.warningColorSuppl;
});
const { maxHeight = '100px' } = defineProps<{ maxHeight?: string }>();
const memberInfo = reactive({
  name: '',
  image: ''
});
const selectOption = [
  {
    label: '會員資料',
    func: () => {
      showMessage?.warning('並沒有');
    }
  },
  {
    label: '登出',
    func: () => {
      logout();
    }
  }
];
const logout = () => {
  console.log('logout');
  localStorage.removeItem('token');
  memberInfo.image = '';
  memberInfo.name = '';
};

onMounted(() => {
  const localToken = localStorage.getItem('token');
  if (localToken) {
    http.get('/member').then((res) => {
      memberInfo.name = res.data.name;
      memberInfo.image = res.data.image;
    });
  }
});
</script>

<template>
  <n-popover :show-arrow="false" trigger="hover" :disabled="!memberInfo.name">
    <template #trigger>
      <div class="container">
        <div
          class="wrap1"
          :style="memberInfo.name ? 'cursor: pointer;' : ''"
          @click="
            () => {
              if (memberInfo.name) logout();
            }
          "
        >
          <div class="img">
            <img :src="memberInfo.image" alt="" v-if="memberInfo.image" />
          </div>
          <div class="name">
            <h5>
              {{ memberInfo.name }}
            </h5>
            <a href="http://localhost:8888/auth/google" v-if="!memberInfo.name">
              <h5>
                {{ '登入' }}
              </h5>
            </a>
          </div>
        </div>
      </div>
    </template>

    <n-space  class="list" v-for="item in selectOption">
      <div class="item">
        <button @click="item.func">{{ item.label }}</button>
      </div>
    </n-space>
  </n-popover>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 3rem;
  align-items: center;
  justify-content: center;
}
.list {
  background-color: rgba(0, 0, 0, 0.8);
  color: rgb(255, 174, 0);
  width: 8rem;
  border-radius: 0.1rem;
  border: rgb(253, 136, 1) solid 0.5px;
  .item {
    text-align: center;
    button {
      color: rgb(255, 174, 0);
      background-color: rgba(0, 0, 0, 0);
      border: none;
      cursor: pointer;
    }
  }
}
.wrap1 {
  max-width: 15rem;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  border: solid 0.2rem;
  border-color: v-bind('borderColor');
  border-radius: 50rem;

  .img {
    height: 75%;
    img {
      height: 100%;
      border-radius: 50%;
      aspect-ratio: 1/1;
    }
  }
  .name {
    // max-width: 50px;
    align-items: center;
    display: flex;
    height: 75%;
    color: wheat;
    margin-left: 0.5rem;
  }
}
</style>
