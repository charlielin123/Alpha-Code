import LightBoxBase from './LightBoxBase.vue';
import { message_util } from '@/components/Message';
import Message from '@/components/Message';
import directive from '@/Directive';
import {
  createApp,
  h,
  type VNode,
  ref,
  onMounted,
  type DefineComponent,
  type ConcreteComponent,
  type Component
} from 'vue';
const timeOut = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
};
const showLightBox = (lightbox: VNode|Component, props?: {[propName:string]:any}, name?: string) => {
  const show = ref(false);
  const rootReady = ref(false);
  const RootNode = {
    name: name ?? 'root',
    setup() {
      const prop2 = {
        modelValue: show,
        onClose: () => {
          if (props?.onClose) {
            props?.onClose();
          }
          show.value = false;
          timeOut(300).then(() => {
            newApp.unmount();
            element.remove()
          });
        }
      };
      onMounted(() => {
        rootReady.value = true;
        timeOut(300).then(() => {
          show.value = true;
        });
      });
      return () => [rootReady.value ? h(lightbox, { ...props, ...prop2 }) : '', h(message_util)];
    }
  };
  const newApp = createApp(RootNode);

  newApp.provide('body', { a: 1, b: 2 });
  newApp.use(Message);
  newApp.use(directive);
  const element = document.createElement('div', {});
  newApp.mount(element);
  document.body.appendChild(element);
};

/**
 * @param {VNode} baseVNode 燈箱內的元件
 * @param {} baseProps 燈箱內元件所需props
 * @param {} lightboxProps 燈箱的props
 * @param {string} lightboxTitle 燈箱的Title
 */
const createLightBox = (
  baseVNode: VNode,
  baseProps: object,
  lightboxProps: object,
  lightboxTitle: string
) => {
  const box = h(LightBoxBase, null, {
    title: () => lightboxTitle ?? '',
    body: () => h('div', h(baseVNode, baseProps))
  });
  showLightBox(box, lightboxProps, lightboxTitle);
};

export { LightBoxBase, showLightBox, createLightBox };
