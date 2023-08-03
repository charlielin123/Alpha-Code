import type { DirectiveBinding } from 'vue';

function resize(event: Event) {
  const ele = event.target as HTMLElement;
  ele.style.height = 'auto';
  ele.style.height = ele.scrollHeight + 'px';
}
export default {
  mounted: (el: HTMLElement, binding: DirectiveBinding<any>) => {
    let maxHeight = binding?.value;
    console.log(maxHeight);
    el.style.height = 'auto';
    el.style.maxHeight = maxHeight;
    el.addEventListener('input', resize);
  },
  unmounted: (el: HTMLElement, binding: DirectiveBinding<{ maxHeight: string }>) => {
    el.removeEventListener('input', resize);
  }
};
