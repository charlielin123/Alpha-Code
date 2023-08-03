import type { App } from 'vue';
import { initWs } from './ws';

export default {
  install(app: App) {
    const ws = initWs('localhost:8888/ws');
    app.provide('ws', ws);
  }
};
