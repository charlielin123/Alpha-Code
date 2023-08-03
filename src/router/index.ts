import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:mId',
      name: 'home2',
      component: HomeView
    },
    {
      path: '/auth/google/callback',
      name: 'auth',
      component: () => import('@/views/Auth.vue')
    }
  ]
});

export default router;
