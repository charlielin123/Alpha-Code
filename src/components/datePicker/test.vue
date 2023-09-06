<script setup lang="ts">
import { reactive ,ref} from 'vue';
import inputDate from './inputDate.vue';

const a = reactive({
  date: ''
});
const show=ref(true)
</script>

<template>
  <div>
    <inputDate v-model="a.date" :format="'yyyy-MM-DD'" v-if="show" placeholder="hi"/>
  </div>
  <button @click="console.log(a)">test</button>
</template>

<style lang="scss" scoped>

</style>
