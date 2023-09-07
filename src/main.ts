import '@/assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import directive from '@/Directive';
import Message from '@/components/Message';
import initConnet from '@/compossible/initConnet';
import DatePicker from '@/components/datePicker/test.vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Message);
app.use(directive);
app.use(initConnet);

app.mount('#app');
