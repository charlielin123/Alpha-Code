<script setup lang="ts">
// import { LightBoxBase } from '@/components';
import LightBoxBase from '@/components/LightBoxBase/Modal4NUi.vue';
import { MissionIoInit } from '@/compossible/ioTest';
import { computed, reactive, ref, toRef, watch, type Ref, type UnwrapRef } from 'vue';
import { NButton, NDatePicker, type GlobalTheme, useThemeVars } from 'naive-ui';
const { card } = defineProps<{ card?: Card | null }>();
const datePicker = ref<null | HTMLInputElement>(null);
const { editCard } = MissionIoInit();
const mirrorCard = reactive<Card>({} as Card);

const theme = useThemeVars();

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
const b = computed<Date | undefined>({
  get() {
    return mirrorCard?.dueDate;
  },
  set(val) {
    mirrorCard.dueDate = val;
  }
});
</script>

<template>
  <LightBoxBase esc>
    <template #header>{{ mirrorCard?.name }}</template>
    <template #body>
      <div class="cardOut">
        <textarea
          v-model="a"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="請輸入內容"
          :style="{
            backgroundColor: theme.modalColor,
            borderColor: theme.borderColor,
            borderRadius: theme.borderRadius,
            color: theme.textColor2,
            fontSize: theme.fontSizeLarge
          }"
        >
        </textarea>

        <n-date-picker v-model:value="b" type="date" />
        <!-- <div>
          <p>期限：{{ mirrorCard?.dueDate }}</p>
          <button
            @click="
              () => {
                datePicker?.showPicker();
              }
            "
          >
            修改
            <input type="date" name="" id="test" ref="datePicker" v-show="false" v-model="b" />
          </button>
        </div> -->
      </div>
    </template>
    <template #footer>
      <n-button class="btn-gray" @click="card ? editCard(mirrorCard) : ''">存檔</n-button>
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
.btn-gray {
  background-color: --alpha-gray;
}
</style>
