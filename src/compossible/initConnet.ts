import type { App } from 'vue';
import { io } from 'socket.io-client';
import { useMessage } from '@/components';
import { showAlert, testAlert } from '@/components/useMessageDialog';

export default {
  install(app: App) {
    console.log('install massage dialog ');
    const socket = io('ws://localhost:8888', { path: '/ws' });
    // const { showMessage } = useMessage();

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

    app.provide('io', socket);
  }
};
