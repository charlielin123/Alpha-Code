<script setup lang="ts">
import ProjectList from '@/components/ProjectList.vue'
import WorkList from '@/components/WorkList.vue'

import { type ITrelloCard, type ICardList, CardList } from '@/components/Interface'
import { onMounted, reactive } from 'vue'

const state = reactive<{ addListing: boolean;addListName: string; lists: ICardList[] }>({
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
  state.addListName= ''
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
      <div style="margin: 2rem 0">
        <div @click="state.addListing = true">新增列表</div>
        <div v-if="state.addListing">
          <AutoFocusInInput
            v-model="state.addListName"
            @submit="addList(state.addListName)"
            @blur="state.addListing = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
