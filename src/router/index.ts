import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/views/Home.vue')
    },
    {
      path: '/missionBroad',
      name: 'missionBroad',
      component: ()=>import('@/views/MissionBroad.vue')
    },
    {
      path: '/missionBroad/:mId',
      name: '',
      component: ()=>import('@/views/MissionBroad.vue')
    },
    {
      path: '/auth/google/callback',
      name: 'auth',
      component: () => import('@/views/Auth.vue')
    },
    {
      path: '/test',
      name: 'T1',
      component: () => import('@/views/Test.vue')
    }
  ]
});

export default router;
