import type { App } from 'vue';
import {io} from 'socket.io-client';


export default {
  install(app: App) {
    console.log('install massage dialog ');
    const socket = io('ws://localhost:8888',{path:'/ws'});

    socket.on('connect', () => {
      console.log('ws on connected');
    })

    app.provide('io', socket);
  }
};
