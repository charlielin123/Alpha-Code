import input from './Input';
import drag from './Drag';
import resize from './Resize';
import type { App, Directive } from 'vue';

const list: { [key: string]: Directive } = {
  input,
  drag,
  resize
};

export default {
  install: (app: App) => {
    for (const key in list) {
      console.log(key);
      app.directive(key, list[key]);
    }
  }
};
