<script setup lang="ts">
import http from '@/compossible/Utils/http';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qs from 'query-string';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const query = route.query;
  const queryStr = qs.stringify(query);
  const res = await http.get('/auth/google/callback?' + queryStr);
  
  if (res.data?.token) {
    localStorage.setItem('token', res.data.token);
  }
  if (res.data?.error) {
    console.error(res.data?.error)
  }
  router.push("/")
});
</script>

<template>
  <h1>hello</h1>
</template>

<style lang="scss" scoped></style>
