<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import http from '@/compossible/Utils/http';
import { useThemeVars, NPopover, NSpace, NDivider } from 'naive-ui';
import { useMessage } from '..';
import { useRoute } from 'vue-router';
const { showMessage } = useMessage();
const nStyle = useThemeVars();
const route = useRoute();

const borderColor = computed(() => {
  return nStyle.value.primaryColor;
});

const authUrl = process.env.BACKEND_URL + '/auth/google';

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
watch(route, () => {
  const localToken = localStorage.getItem('token');
  if (localToken && !memberInfo.name) {
    http.get('/member').then((res) => {
      memberInfo.name = res.data.name;
      memberInfo.image = res.data.image;
      if (res.data.status != 0) {
      }
    });
  }
});

onMounted(() => {
  const localToken = localStorage.getItem('token');
  if (localToken && !memberInfo.name) {
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
        <div class="wrap1" :style="memberInfo.name ? 'cursor: pointer;' : ''">
          <div class="img">
            <img :src="memberInfo.image" alt="" v-if="memberInfo.image" />
          </div>
          <div class="name">
            <h5>
              {{ memberInfo.name }}
            </h5>
            <a :href="authUrl" v-if="!memberInfo.name">
              <h5>
                {{ '登入' }}
              </h5>
            </a>
          </div>
        </div>
      </div>
    </template>

    <n-space vertical class="list">
      <template v-for="item in selectOption">
        <div class="item">
          <button @click="item.func">{{ item.label }}</button>
        </div>
      </template>
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
  background-color: v-bind('nStyle.baseColor');
  // background-color: rgba(0, 0, 0, 0.8);
  color: v-bind('nStyle.textColor1');
  width: 8rem;
  border-radius: 0.1rem;
  // border: rgb(253, 136, 1) solid 0.5px;
  .item {
    text-align: center;
    border-bottom: 2px solid;
    border-color: orange;
    // border-color: var(--warning-color);
    button {
      // color: rgb(255, 174, 0);
      color: v-bind('nStyle.textColor1');
      font-size: 1rem;
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
  border: solid 0.15rem;
  border-color: v-bind('borderColor');
  border-radius: 50rem;
  margin: 0 0.5rem;
  background-color: v-bind('nStyle.avatarColor');

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
    // color: wheat;
    color: v-bind('nStyle.textColor1');
    // font-family: v-bind('nStyle.fontFamily');
    margin-left: 0.5rem;
  }
}
</style>
