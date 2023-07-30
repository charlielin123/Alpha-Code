<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue';
import WorkList from '@/components/WorkList.vue';
import { initWs, type customWebSocket } from '@/compossible/ws';
import { type ITrelloCard, type ICardList, CardList } from '@/components/Interface';
import { nextTick, onMounted, reactive, watch } from 'vue';
import Member from '@/components/header/Member.vue';
import { useRoute, useRouter } from 'vue-router';
import http from '@/compossible/Utils/http';

let ws: customWebSocket;
const route = useRoute();
const router = useRouter();

const state = reactive<{ addListing: boolean; addListName: string; lists: ICardList[] }>({
  addListing: false,
  addListName: '',
  lists: []
});

const addList = (name: string) => {
  const newList = new CardList(name, []);
  addAPI(newList);
  state.addListName = '';
};
const addAPI = (newList: CardList) => {
  ws.emit('listChange', newList);
};

const cardListChange = (list: CardList) => {
  console.log(list);
  addAPI(list);
};
let first = true;
onMounted(() => {
  ws = initWs('localhost:8888/ws2');
  ws.onmessage = async (e) => {
    const data = JSON.parse(e.data);
    Object.assign(state.lists, data);
    await nextTick();
    first = false;
  };
  watch(
    state.lists,
    () => {
      if (!first) {
        ws.send(JSON.stringify(state.lists));
      }
    },
    { deep: true }
  );
});
</script>


<template>
  <header><Member /></header>
  <div class="wrap">
    <div class="sideBar">
      <ProjectList />
    </div>
    <div class="main">
      <template v-for="(list, index) in state.lists">
        <work-list @add-card="cardListChange" :list="list" />
      </template>
      <div>
        <div style="margin: 2rem 0" class="add" :class="state.addListing ? 'active' : ''">
          <div @click="state.addListing = true">+ 新增列表</div>
          <div v-if="state.addListing">
            <input
              v-focus
              v-model="state.addListName"
              @keydown.enter="addList(state.addListName)"
              @blur="state.addListing = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
  padding: 0 1rem;
}

.add {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1rem 2rem;
  color: rgb(104, 117, 215);
  background-color: $back-color2-hover;
  border-radius: 0.5rem;
  width: 16rem;
  &.active {
    background-color: $back-color;
  }
  input {
    margin: 1rem 0;
    // height: 1.5rem;
    font-size: 1.2rem;
    width: 100%;
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;

    &:focus {
      outline: rgb(71, 87, 208);
      border: 2px solid rgb(71, 87, 208);
      box-shadow: 0 0 0.2rem 1px rgb(71, 87, 208);
    }
  }
}
.wrap {
  height: calc(100vh - $header-height);
  display: flex;
}
.sideBar {
  height: 100%;
  width: 19rem;
}
.main {
  height: 100%;
  width: calc(100vw - 19rem);
  display: flex;
}
</style>
