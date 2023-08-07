<script setup lang="ts">
import { LightBoxBase } from '@/components';
import { MissionIoInit } from '@/compossible/ioTest';
import { computed, reactive, ref, toRef, watch } from 'vue';
const { card } = defineProps<{ card?: Card | null }>();
const datePicker = ref<null | HTMLInputElement>(null);
const { editCard } = MissionIoInit();
const mirrorCard = reactive<Card>({} as Card);
watch(
  () => card,
  () => {
    Object.assign(mirrorCard, card);
  }
);
const a = computed({
  get() {
    return mirrorCard?.content;
  },
  set(val) {
    mirrorCard.content = val;
  }
});
</script>

<template>
  <LightBoxBase esc>
    <template #header>{{ mirrorCard?.name }}</template>
    <template #body>
      <div class="cardOut">
        <textarea v-model="a" name="" id="" cols="30" rows="10" placeholder="請輸入內容">
        </textarea>
        <div>
          <p>期限：{{ mirrorCard?.dueDate }}</p>
          <button
            @click="
              () => {
                datePicker?.showPicker();
              }
            "
          >
            修改
            <input type="date" name="" id="test" ref="datePicker" v-show="false" />
          </button>
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="card ? editCard(mirrorCard) : ''">存檔</button>
    </template>
  </LightBoxBase>
</template>

<style lang="scss" scoped>
.cardOut {
  width: 20rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
textarea {
  padding: 0.5rem 1rem;
  resize: none;
}
</style>
