<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { VueDraggableNext as vueDraggable } from 'vue-draggable-next';
import { type ITrelloCard, type ICardList } from '@/components/Interface';
// import { showCardModel } from '@/components/LightBox';
import type { customWebSocket } from '@/compossible/ws';
import CardLightBox from '@/components/LightBox/CardLightBox.vue';
import { useThemeVars } from 'naive-ui';
const nStyle=useThemeVars();

const drag = ref(false);
const addCardObj = reactive({
  adding: false,
  name: ''
});

const cardModal = reactive<{ display: boolean; card: Card | null }>({ display: false, card: null });

const { list } = defineProps<{ list: CardBox }>();
const emit = defineEmits(['addCard', 'changeIndex']);

const showCardModel = (card: Card) => {
  cardModal.display = true;
  card.content = card?.content ?? '';

  cardModal.card = card;
};
const addCard = () => {
  emit('addCard', list._id, addCardObj.name);
  // addCardObj.adding = false
  addCardObj.name = '';
};
</script>

<template>
  <div>
    <div class="container">
      <div class="head">
        <h2>{{ list.name }}</h2>
      </div>
      <template v-if="1">
        <vue-draggable
          group="todoList"
          v-model="list.cards"
          class="list"
          ghost-class="ghost"
          @start="drag = true"
          @end="drag = false"
          @change="emit('changeIndex', list)"
          v-bind="{ animation: 200 }"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : ''">
            <div
              v-for="element in list.cards"
              :key="element._id"
              class="item"
              ref="itemRef"
              :menu-id="element"
              tabindex="-1"
              @click="
                () => {
                  showCardModel(element);
                }
              "
            >
              <span class="name">
                {{ element.name }}
              </span>
            </div>
          </transition-group>
        </vue-draggable>
      </template>
      <div class="item item2" v-if="addCardObj.adding">
        <textarea
          v-focus
          v-auto-height
          v-model="addCardObj.name"
          @keydown.enter.prevent="addCard"
          @blur="
            () => {
              if (addCardObj.name.length <= 0) addCardObj.adding = false;
            }
          "
          placeholder="為這張卡片輸入標題..."
          class="addBox"
        />
      </div>
      <div
        class="item"
        @click="
          () => {
            addCardObj.name = '';
            addCardObj.adding = !addCardObj.adding;
          }
        "
      >
        <span class="name">
          {{ !addCardObj.adding ? '新增卡片' : '取消' }}
        </span>
      </div>
    </div>
  </div>

  <CardLightBox v-model:card="cardModal.card" v-model="cardModal.display" />
</template>

<style lang="scss" scoped>
$main-color: #ccc;
$back-color: rgb(25, 25, 25, 0.9);
$back-color2: rgb(100, 100, 100, 0.8);
$back-color2-hover: rgb(100, 100, 100, 0.5);
$text-color: #ededed;

.container {
  background-color: v-bind('nStyle.primaryColor');
  backdrop-filter:opacity(0.8);
  // background-color: $back-color;
  box-shadow:0 1px 1rem 1px $back-color2-hover  ;
  color: $text-color;
  margin: 2rem 1rem;
  border-radius: 0.5rem;
  // border: solid 1px #ccc;
  width: 16rem;
  overflow: hidden;
  padding-top: 1rem;
  // -webkit-filter: blur(3px);
  backdrop-filter: blur(10px);
  .head {
    h2 {
      text-align: center;
    }
    // background-color: $main-color;
    padding: 0.2rem 0.5rem;
    width: 100%;
  }
  .list {
    min-height: 1rem;
  }

  .item {
    background-color: $back-color2;
    border-radius: 0.5rem;
    padding: 1rem 1rem;
    margin: 1rem 1rem;
    display: flex;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      background-color: $back-color2-hover;
    }
    &.item2 {
      background-color: rgba(20, 20, 20, 0.2);
      box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
    }
    .addBox {
      color: $text-color;
      max-width: 100%;
      background-color: rgba(0, 0, 0, 0);
      border: none;
      border-radius: 0.2rem;
      overflow-wrap: anywhere;
      resize: none;
      margin: 0;
      padding: 0;
      max-height: 8rem;
      &:focus,
      &:active {
        outline: none !important;
      }
      &::placeholder {
        color: $text-color;
      }
    }
  }
}
.name {
  overflow-wrap: anywhere;
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
