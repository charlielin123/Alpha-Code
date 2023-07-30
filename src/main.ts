import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { install } from '@/components';
import Message from '@/components/Message';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Message);
app.use(install);

app.mount('#app');
