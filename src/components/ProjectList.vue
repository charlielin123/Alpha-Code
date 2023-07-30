<script setup lang="ts">
import { VueDraggableNext as vueDraggable } from 'vue-draggable-next';

import { onMounted, ref, type Ref } from 'vue';

interface menuItem {
  name: string;
  id: number;
  icon?: string;
  orderBy: number;
}
const menuItems: Ref<menuItem[]> = ref([] as menuItem[]);
const showAdd = ref(false);
const itemRef: Ref<HTMLElement[] | []> = ref([]);
const addBtnRef: Ref<HTMLElement | null> = ref(null);

const addName = ref('');
const add = () => {
  if (!addName.value) return;
  menuItems.value.unshift({
    name: addName.value,
    id: Math.random(),
    orderBy: menuItems.value.length + 1
  });
  fin1();
  addName.value = '';
  showAdd.value = false;
  addBtnRef.value?.focus();
};
const hoverItem: Ref<Boolean[]> = ref([]);
const deleteItem = (id: number) => {
  itemRef.value?.forEach((item) => {
    const menuId = Number.parseFloat(item.attributes.getNamedItem('menu-id')?.value ?? '');
    if (menuId == id) {
      const width = item.clientWidth + 10;
      item.style.transform = `translateX(${-width}px)`;
      menuItems.value = menuItems.value.filter((item) => item.id !== id);
    }
  });
  fin1();
};

const list2: Ref<menuItem[]> = ref([]);
const fin1 = () => {
  setTimeout(() => {
    list2.value = [...menuItems.value];
  }, 2000);
};

onMounted(() => {
  // 正常要在這取資料
  const nameList = ['前端', '後端', '資料庫'];
  list2.value = menuItems.value;

  nameList.forEach((n) => {
    menuItems.value.push({
      name: n,
      id: Math.random(),
      orderBy: menuItems.value.length + 1
    });
  });
});
</script>

<template>
  <div class="wrap">
    <div class="top">
      <div class="title">
        項目列表<button ref="addBtnRef" @click="showAdd = !showAdd">＋</button>
      </div>
      <div class="add" v-if="showAdd">
        <input
          v-focus
          @keydown.enter="add"
          v-model="addName"
          type="text"
          style="width: 80%"
        /><button @click="add">確認</button>
      </div>
    </div>
    <vue-draggable group="menu1" :list="menuItems" class="list" ghost-class="ghost" @end="fin1">
      <transition-group type="transition" name="flip-list">
        <div
          v-for="(element, index) in list2"
          :key="element.id"
          class="item"
          ref="itemRef"
          :menu-id="element.id"
          tabindex="-1"
          @mouseenter="hoverItem[index] = true"
          @mouseleave="hoverItem[index] = false"
        >
          <div class="name">
            {{ element.name }}
          </div>

          <button class="delete" @click="deleteItem(element.id)" v-if="hoverItem[index]">D</button>
          <!-- </div> -->
        </div>
      </transition-group>
    </vue-draggable>
  </div>
</template>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
  .name {
    background-color: red;
  }
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(71, 218, 71, 0.75);
  .top {
    width: 100%;
    // height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: bold;
    // padding: 0.5rem 0;
    margin-top: 0.5rem;
    .add {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.5rem 1rem;
      // height: 3rem;
      // height: 2rem;
      input {
        // height: 90%;
        border-radius: 0.2rem;
        font-size: 1.2rem;
        height: 2rem;
        text-align: center;
      }
      button {
        margin-top: 0.5rem;
        font-size: 1rem;
        // font-weight: bold;
        line-height: 100%;
        border: rgba(255, 255, 255, 0.9) solid 0.1rem;
        background-color: rgb(222, 135, 12);
        border-radius: 0.2rem;
        padding: 0.3rem;
        &:hover {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }
    }

    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: solid;
      button {
        width: 1.5rem;
        font-size: 1rem;
        font-weight: bold;
        line-height: 100%;
        aspect-ratio: 1;
        border: rgba(255, 255, 255, 0.9) solid 0.1rem;
        background-color: rgb(222, 135, 12);
        border-radius: 0.2rem;
        padding: 0.1rem;
        &:hover {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }
    }
  }
  .list {
    width: 100%;

    .item {
      width: 100%;
      border: 1px solid;
      padding: 0.5rem;
      display: flex;
      // align-items: center;
      justify-content: center;
      position: relative;
      transition: transform 0.2s ease-out;

      &:hover {
        background-color: rgb(165, 165, 165, 0.5);
        cursor: grab;
      }
      &:focus {
        background-color: rgb(165, 165, 165, 0.5);
      }
      .name {
        display: contents;
        font-size: 1.2rem;
        font-weight: bold;
      }
      .delete {
        position: absolute;
        right: 0px;
        top: 0;
        font-size: 1rem;
        font-weight: bold;
        // display: none;
        aspect-ratio: 1;
        height: 100%;
        border: none;
        background-color: rgba(255, 0, 0, 0.3);
        &:hover {
          background-color: rgba(255, 0, 0);
        }
      }
    }
  }
}

.flip-list-move {
  transition: transform 0.2s;
}
.no-move {
  transition: transform 0s;
}
</style>
