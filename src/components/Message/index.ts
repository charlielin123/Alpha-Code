import {
  reactive,
  ref,
  watch,
  inject,
  defineComponent,
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  type DirectiveBinding,
  type App
} from 'vue';
import MessageUtil from './MessageUtil.vue';
const useMessageKey = Symbol('ct016_useMessage');
const msgUtilListKey = Symbol('ct016_msgUtilList');
// const message_util=MessageUtil;
export const message_util = defineComponent(MessageUtil);

export default {
  install: (app: App) => {
    const list = reactive<{ message: string; type: string; key: number }[]>([]);
    const err = (str: string) => {
      list.push({ message: str, type: 'error', key: Math.random() });
    };
    const warning = (str: string) => {
      list.push({ message: str, type: 'warning', key: Math.random() });
    };
    const info = (str: string) => {
      list.push({ message: str, type: 'success', key: Math.random() });
    };
    const deleteSwitch = ref(false);
    const countDown = () => {
      const iid = setInterval(() => {
        list.shift();
        if (list.length === 0) {
          clearInterval(iid);
          deleteSwitch.value = false;
        }
      }, 1500);
    };
    watch(list, () => {
      if (list.length > 0) {
        deleteSwitch.value = true;
        if (list.length > 5) {
          list.shift();
        }
      }
    });
    watch(deleteSwitch, () => {
      if (deleteSwitch.value) {
        countDown();
      }
    });
    app.component('MessageUtil', message_util);
    const useMessage = { err, warning, info };
    app.provide(useMessageKey, useMessage);
    app.provide(msgUtilListKey, list);
  }
};

export function useMessage() {
  /**
   * @type {{err:Function, warning:Function, info:Function}|undefined}
   */
  const showMessage = inject<{ err: Function; warning: Function; info: Function }>(useMessageKey);
  const list = inject(msgUtilListKey);
  return { showMessage, list };
}
