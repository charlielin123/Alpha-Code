<script setup lang="ts">
import { uuid, useDrag } from '@/compossible/Utils/tools'
import { onMounted, reactive, ref, watch } from 'vue'
import { VueDraggableNext as vueDraggable } from 'vue-draggable-next'
import { type ITrelloCard, type ICardList } from '@/components/Interface'
const { initDrag } = useDrag()
const drag = ref(false)

const state = reactive<{ list: ICardList }>({
  list: {} as ICardList
})
const addCardObj = reactive({
  adding: false,
  name: ''
})
const { list } = defineProps<{ list: ICardList }>()

const addCard = () => {
  state.list.cards.push({
    card: {
      id: uuid(),
      name: addCardObj.name
    }
  })
  // addCardObj.adding = false
  addCardObj.name = ''
}

onMounted(() => {
  state.list = JSON.parse(JSON.stringify(list)) as ICardList
})
// watch(list, (newLost) => {
//   state.list = JSON.parse(JSON.stringify(newLost)) as TrelloCard[]
// })
</script>

<template>
  <div>
    <div class="container">
      <div class="head">
        <h2>{{ state.list.name }}</h2>
      </div>
      <template v-if="state.list?.cards?.length > 0">
      <vue-draggable
        group="todoList"
        v-model="state.list.cards"
        class="list"
        ghost-class="ghost"
        @start="drag = true"
        @end="drag = false"
        v-bind="{ animation: 200 }"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : ''">
          <div
            v-for="element in state.list.cards"
            :key="element.card.id"
            class="item"
            ref="itemRef"
            :menu-id="element"
            tabindex="-1"
          >
            <div class="name">
              {{ element.card.name }}
            </div>
          </div>
        </transition-group>
      </vue-draggable>
    </template>
      <div class="item" v-if="addCardObj.adding">
        <AutoFocusInInput
          v-model="addCardObj.name"
          @submit="addCard"
          @blur="addCardObj.adding = false"
          style="
            width: 100%;
            background-color: rgba(250, 235, 215, 0.362);
            border: solid 0.5px;
            border-radius: 0.2rem;
            height: 1.7rem;
            padding: 0 0.5rem;
            font-size: 1.2rem;
          "
        />
      </div>
      <div
        class="item"
        @click="
          () => {
            addCardObj.name = ''
            addCardObj.adding = true
          }
        "
      >
        {{ !addCardObj.adding ? '新增卡片' : '取消' }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$main-color: #ccc;

.container {
  // padding: 0 0.5rem;
  margin: 2rem 1rem;
  border-radius: 0.5rem;
  border: solid 1px #ccc;
  width: 15rem;
  overflow: hidden;
  .head {
    h2 {
      text-align: center;
    }
    background-color: $main-color;
    padding: 0.2rem 0.5rem;
    width: 100%;
  }
  .item {
    background-color: #ebebeb;
    border-radius: 0.5rem;
    padding: 1rem 1rem;
    margin: 1rem 1rem;
    position: relative;
    &:hover {
      background-color: #ebebeba4;
    }
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0;
  background: #c8ebfb;
}
</style>
