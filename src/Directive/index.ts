import input from './Input';
import drag from './Drag';
import resize from './Resize';
import autoHeight from './autoHeight';
import type { App, Directive } from 'vue';
const focus = {
  mounted: (el: HTMLElement) => {
    el.focus();
  }
};

const list: { [key: string]: Directive } = {
  input,
  drag,
  resize,
  autoHeight,
  focus
};

export default {
  install: (app: App) => {
    for (const key in list) {
      app.directive(key, list[key]);
    }
  }
};
