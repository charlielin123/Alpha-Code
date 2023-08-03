<script setup lang="ts">
import { LightBoxBase } from '@/components';
import { ref } from 'vue';
const { card } = defineProps<{ card?: Card }>();
const datePicker = ref<null | HTMLInputElement>(null);
</script>

<template>
  <LightBoxBase esc >
    <template #header>{{ card?.name }}</template>
    <template #body>
      <div class="cardOut">
        <textarea name="" id="" cols="30" rows="10" placeholder="請輸入內容">
          {{ card?.content }} 
        </textarea>
        <div>
          <p>期限：{{ card?.dueDate }}</p>
          <button
            @click="
              () => {
                datePicker?.showPicker()
              }
            "
          >
            修改
            <input type="date" name="" id="test" ref="datePicker" v-show="false"/>
          </button>
        </div>
      </div>
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
