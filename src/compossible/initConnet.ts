import type { App } from 'vue';
import { io } from 'socket.io-client';
import { useMessage } from '@/components';
import { showAlert, testAlert } from '@/components/useMessageDialog';

export default {
  install(app: App) {
    if (!process.env.WS_URL) return;


    const socket = io(process.env.WS_URL, {
      path: '/ws',
      auth: {
        token: localStorage.getItem('token') ?? ''
      }
    });
    // const { showMessage } = useMessage();

    console.log('???');
    socket.on('connect', () => {
      console.log('ws on connected');
    });

    socket.on(
      'error',
      (err: { error: string; message: string; statusCode: string; show: boolean }) => {
        // if (err.show) {
        testAlert({ title: err.error, message: err.message });
        // } else {
        //   showMessage?.err(err.message);
        // }
      }
    );

    socket.on('connect_error', (err) => {
      console.log(err instanceof Error); // true
      console.log(err.message); // not authorized
      // console.log(err.data); // { content: "Please retry later" }
    });

    app.provide('io', socket);
  }
};
