<script setup lang="ts">
import { onMounted, ref, } from 'vue'
import { type Ref } from 'vue'

interface InputRef {
  value: HTMLInputElement | null
}
const emit = defineEmits(['submit'])
const modelValue=defineModel();

const input: Ref<InputRef['value']> = ref(null)

onMounted(() => {
  input.value?.focus()
})

</script>

<template>
  <input
    type="text"
    ref="input"
    v-model="modelValue"
    @keydown.enter.prevent="emit('submit')"
  />
</template>

<style lang="scss" scoped></style>
