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

  let startHeight = vNode.props?.style?.height ?? el.offsetHeight + 'px';
  let startWidth = vNode.props?.style?.width ?? el.offsetWidth + 'px';
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
  const temp: { top: number; left: number } = { top: 0, left: 0 };
  let flag = true;

  el.style.setProperty('top', (window.innerHeight - el.offsetHeight) / 2 + 'px');
  el.style.setProperty('left', (window.innerWidth - el.offsetWidth) / 2 + 'px');

  let f11 = false;
  const initDrag = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startTop = el.offsetTop;
    startLeft = el.offsetLeft;
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
    // console.log(startTop, startLeft);
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (f11 && deltaY > 10) {
      el.style.width = startWidth;
      el.style.height = startHeight;
      const x = dragBar.offsetWidth / 2;
      const y = dragBar.offsetHeight / 2;
      startTop = event.clientY - y;
      startLeft = event.clientX - x;
      el.style.setProperty('top', temp.top + 'px');
      el.style.setProperty('left', temp.left + 'px');
      f11 = false;
      return;
    }

    let top = startTop + deltaY;
    let left = startLeft + deltaX;

    if (top + 10 >= maxHeight - el.clientHeight) {
      top = maxHeight - el.clientHeight;
    }
    if (left <= 10) {
      left = 0;
    }
    if (left + 10 > maxWidth - el.clientWidth) {
      left = maxWidth - el.clientWidth;
    }
    if (top <= 10) {
      if (f11 == false) {
        temp.top = el.offsetTop;
        temp.left = el.offsetLeft;
        f11 = true;
      }
      top = 0;
      left = 0;
      el.style.width = '100vw';
      el.style.height = '100vh';
    }

    el.style.top = plusPx(top);
    el.style.left = plusPx(left);
  };

  const stopDrag = () => {
    dragging = false;
    console.log(temp);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };

  dragBar.addEventListener('mousedown', initDrag);
};
const plusPx = (a: number) => {
  return a + 'px';
};
