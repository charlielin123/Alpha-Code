import type { DirectiveBinding } from 'vue';

const defaultT = {
  el: {} as HTMLInputElement,
  func: () => {}
};

const test = (el: HTMLInputElement, event: MouseEvent, func: Function) => {
  const left = el.offsetLeft;
  const top = el.offsetTop;
  const right = left + el.clientWidth;
  const bottom = top + el.clientHeight;
  if (
    !(event.clientX > left && event.clientX < right) ||
    !(event.clientY > top && event.clientY < bottom)
  ) {
    func(event);
  }
};

const doing = (event: MouseEvent) => {
  const left = defaultT.el.offsetLeft;
  const top = defaultT.el.offsetTop;
  const right = left + defaultT.el.clientWidth;
  const bottom = top + defaultT.el.clientHeight;
  if (
    !(event.clientX > left && event.clientX < right) ||
    !(event.clientY > top && event.clientY < bottom)
  ) {
    defaultT.func();
  }
};

export default {
  /**
   *
   * @param {HTMLInputElement} el
   * @param {DirectiveBinding} binding
   */
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    const { value: func } = binding;
    defaultT.el = el;
    defaultT.func = func;

    const t = setTimeout(() => {
      onClickOutSide(el, func);
      clearTimeout(t);
    }, 500);
  },
  unmounted(el: HTMLInputElement, binding: DirectiveBinding) {
    // console.log('unmounted');
  }
};

function onClickOutSide(target: HTMLElement, func: Function) {
  const clickOut = (event: MouseEvent) => {
    const left = target.offsetLeft;
    const top = target.offsetTop;
    const right = left + target.clientWidth;
    const bottom = top + target.clientHeight;
    if (!document.contains(target)||!checkElementVisibility(target)) {
      document.documentElement.removeEventListener('click', clickOut);
      return;
    }
    if (
      !(event.clientX > left && event.clientX < right) ||
      !(event.clientY > top && event.clientY < bottom)
    ) {
      func(event);
    }
  };


  document.documentElement.addEventListener('click', clickOut);
}

/**
 * 檢查 HTMLElement 是否顯示於頁面上。
 *
 * @param {HTMLElement} element - 要檢查的 HTMLElement。
 * @return {boolean} - 若 element 在頁面上可見，則返回 true，否則返回 false。
 */
function checkElementVisibility(element: HTMLElement): boolean {
  const computedStyle = getComputedStyle(element);
  const display = computedStyle.getPropertyValue('display');
  const visibility = computedStyle.getPropertyValue('visibility');

  return display !== 'none' && visibility !== 'hidden';
}