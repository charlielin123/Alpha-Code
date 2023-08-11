<script setup lang="ts">
// import { LightBoxBase } from '@/components';
import LightBoxBase from '@/components/LightBoxBase/Modal4NUi.vue';
import { MissionIoInit } from '@/compossible/ioTest';
import { computed, reactive, ref, toRef, watch, type Ref, type UnwrapRef } from 'vue';
import { NButton, NDatePicker, NInput, type GlobalTheme, useThemeVars } from 'naive-ui';
const { card } = defineProps<{ card?: Card | null }>();
const { editCard } = MissionIoInit();
const mirrorCard = reactive<Card>({} as Card);

const theme = useThemeVars();

function clearProps(this: { [key: string]: any }) {
  for (const key in this) {
    this[key] = null;
  }
}

watch(
  () => card,
  () => {
    clearProps.call(mirrorCard);
    Object.assign(mirrorCard, card);
  }
);

const canEdit = ref(false);
const a = computed({
  get() {
    return mirrorCard?.content;
  },
  set(val) {
    mirrorCard.content = val;
  }
});
const b = computed<number | undefined>({
  get() {
    if (!mirrorCard?.dueDate) return undefined;
    const date = new Date(mirrorCard?.dueDate);
    return date.getTime();
  },
  set(val) {
    if (!val) return;
    const d = new Date(val);
    mirrorCard.dueDate = d;
  }
});
</script>

<template>
  <LightBoxBase esc>
    <template #header>{{ mirrorCard?.name }}</template>
    <template #body>
      <div class="cardOut">
        <p>詳細內容：</p>
        <n-input
          v-model:value="a"
          type="textarea"
          placeholder="請輸入內容"
          style="height: 18rem"
          :disabled="!canEdit"
          @click="canEdit = true"
          @blur="
            () => {
              canEdit = false;
              editCard(mirrorCard);
            }
          "
          :resizable="false"
          title="點擊以編輯"
        />
        <p>期限：</p>
        <n-date-picker v-model:value="b" @update:value【="editCard(mirrorCard)" />
      </div>
    </template>
    <template #footer>
      <!-- <n-button
        class="btn-gray"
        type="primary"
        strong
        secondary
        @click="card ? editCard(mirrorCard) : ''"
        >存檔</n-button
      > -->
    </template>
  </LightBoxBase>
</template>

<style lang="scss" scoped>
.cardOut {
  padding: 0.5rem 0;
  min-width: 32rem;
  width: 100%;
  min-height: 35rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .textarea {
    height: 99rem;
  }
}

.btn-gray {
  background-color: --alpha-gray !important;
}
</style>
