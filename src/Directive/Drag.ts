import type { DirectiveBinding, VNode } from 'vue';

/**
 *
 * @param {HTMLElement} el
 * @param {*} bind
 * @param {*} vNode
 */
export default (el: HTMLInputElement, bind: DirectiveBinding, vNode: VNode) => {
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startTop = 0;
  let startLeft = 0;

  let startHeight = el.clientHeight;
  let startWidth = el.clientWidth;
  let dragBar = bind.value;
  let inner = bind.value?.inner;
  if (!(dragBar instanceof HTMLElement)) {
    dragBar = document.querySelector(dragBar);
  }
  if (!dragBar) return;
  dragBar.style.cursor = 'move';

  const maxHeight = inner?.clientHeight || window.innerHeight;
  const maxWidth = inner?.clientWidth || window.innerWidth;
  const borderTop = inner?.offsetTop || 0;
  const borderLeft = inner?.offsetLeft || 0;

  let f11 = false;
  const initDrag = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startTop = el.offsetTop;
    startLeft = el.offsetLeft;
    if (f11 ) {
      // startX = el.offsetLeft;
      // startY = el.offsetTop;
      startTop = event.clientY;
      startLeft = event.clientX;
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  };
  /**
   *
   * @param {MouseEvent} event
   * @returns
   */
  const drag = (event: MouseEvent) => {
    if (!dragging) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (f11 && deltaY > 0) {
      el.style.width = startWidth + 'px';
      el.style.height = startHeight + 'px';
      // startX = event.clientX;
      // startY = event.clientY;
      // startTop = event.clientY;
      // startLeft = event.clientX;
      f11 = false;
      return;
    }

    let top = startTop + deltaY;
    let left = startLeft + deltaX;
    if (top + 10 >= maxHeight - el.clientHeight) {
      top = maxHeight - el.clientHeight;
    }
    if (top <= 10) {
      top = 0;
      el.style.width = '100vw';
      el.style.height = '100vh';
      f11 = true;
    }
    if (left <= 10) {
      left = 0;
    }
    if (left + 10 > maxWidth - el.clientWidth) {
      left = maxWidth - el.clientWidth;
    }

    el.style.top = plusPx(top);
    el.style.left = plusPx(left);
  };

  const stopDrag = () => {
    dragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };

  dragBar.addEventListener('mousedown', initDrag);
};
const plusPx = (a: number) => {
  return a + 'px';
};
