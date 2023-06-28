<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue'
import WorkList from '@/components/WorkList.vue'

import { type ITrelloCard, type ICardList, CardList } from '@/components/Interface'
import { onMounted, reactive } from 'vue'

const state = reactive<{ addListing: boolean; addListName: string; lists: ICardList[] }>({
  addListing: false,
  addListName: '',
  lists: []
})

const cards = [
  { card: { id: '1', name: 'test1' } },
  { card: { id: '2', name: 'test2' } },
  { card: { id: '3', name: 'test3' } }
]
const list1: ICardList = new CardList('List1', cards)

const addList = (name: string) => {
  state.lists.push(new CardList(name, []))
  state.addListName = ''
}
onMounted(() => {
  state.lists.push(list1)
})
</script>

<template>
  <div class="wrap">
    <div class="sideBar">
      <ProjectList />
    </div>
    <div class="main">
      <template v-for="(list, index) in state.lists">
        <work-list :list="list" />
      </template>
      <div>

        <div style="margin: 2rem 0" class="add">
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

.add{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1rem 2rem;
  color: rgb(104, 117, 215);
  background-color: $back-color2-hover;
  border-radius: 0.5rem;
  width: 18rem;
  input{
    margin: 1rem 0;
    // height: 1.5rem;
    font-size: 1.2rem;
    width: 100%;
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
    &.focus{
      background-color: $;
    }
    &:focus{
      outline: rgb(71, 87, 208) ;
      border: 2px solid rgb(71, 87, 208);
      box-shadow: 0 0 0.2rem 1px rgb(71, 87, 208);
    }
  }
}
.wrap {
  display: flex;
}
.sideBar {
  height: 100vh;
  width: 19rem;
}
.main {
  height: 100vh;
  width: calc(100vw - 19rem);
  display: flex;
}
</style>
