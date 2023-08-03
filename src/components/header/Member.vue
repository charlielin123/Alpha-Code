<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import http from '@/compossible/Utils/http';
import { getCookie, deleteCookie } from '@/compossible/Utils/tools';
const { maxHeight = '100px' } = defineProps<{ maxHeight?: string }>();
const memberInfo = reactive({
  name: '',
  image: ''
});
const showList = ref(false);
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
  <div
    class="container"
    @mouseover="
      (e) => {
        if (memberInfo.name) showList = true;
      }
    "
  >
    <div class="wrap1" :style="memberInfo.name?'cursor: pointer;':''" @click="()=>{if(memberInfo.name)logout()}">
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
    <div
      class="list"
      v-if="showList"
      @mouseout="
        () => {
          showList = false;
        }
      "
    >
      <div class="item">
        <button @click="logout">登出</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 3rem;
  align-items: center;
}
.list {
  background-color: rgba(0, 0, 0, 0.8);
  color: rgb(255, 174, 0);
  width: 60%;
  border-radius: 0.1rem;
  border: rgb(253, 136, 1) solid 0.5px;
  .item {
    text-align: center;
    button {
      color: rgb(255, 174, 0);
      background-color: rgba(0, 0, 0, 0);
      border: none;
    }
  }
}
.wrap1 {
  max-width: 15rem;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.5rem;
  border: solid white;
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
