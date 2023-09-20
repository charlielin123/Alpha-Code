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
  let startHeight = el?.style?.height ?? el.offsetHeight + 'px';
  let startWidth = el?.style?.width ?? el.offsetWidth + 'px';
  let dragBar = bind.value;
  let arg: unknown = bind.arg;
  let containerEle: HTMLElement | null = null;
  if (arg instanceof HTMLElement) {
    containerEle = arg;
  } else {
    containerEle = document.querySelector(('#' + arg) as string);
  }
  if (!(dragBar instanceof HTMLElement)) {
    dragBar = document.querySelector(dragBar);
  }
  if (!dragBar) return;
  dragBar.style.cursor = 'move';

  let maxHeight = containerEle?.clientHeight || window.innerHeight;
  let maxWidth = containerEle?.clientWidth || window.innerWidth;
  const borderTop = containerEle?.offsetTop || 0;
  const borderLeft = containerEle?.offsetLeft || 0;
  const defaultStyle = {
    maxHeight: el.style?.maxHeight,
    maxWidth: el.style?.maxWidth,
    width: el.style?.width,
    height: el.style?.height
  };
  const tempStyle = {
    height: el.style?.height,
    width: el.style?.width
  };
  // const temp: { top: number; left: number } = { top: borderTop, left: borderLeft };
  let isSizeChange = false;
  el.style.setProperty('top', (maxHeight - el.offsetHeight) / 2 + 'px');
  el.style.setProperty('left', (maxWidth - el.offsetWidth) / 2 + 'px');

  let isFullSize = false;
  const initDrag = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startTop = el.offsetTop;
    startLeft = el.offsetLeft;
    maxHeight = containerEle?.offsetHeight || window.innerHeight;
    maxWidth = containerEle?.offsetWidth || window.innerWidth;
    if (!isFullSize) {
      startHeight = el.offsetHeight + 'px';
      startWidth = el.offsetWidth + 'px';
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
    /**
     * 最大化要變小時
     */
    if (isFullSize && deltaY > 6) {
      el.style.width = startWidth;
      el.style.height = startHeight;
      
      el.style.setProperty('max-width', defaultStyle.maxWidth);
      el.style.setProperty('max-height', defaultStyle.maxHeight);
      el.style.setProperty('width', defaultStyle.width);
      el.style.setProperty('height', defaultStyle.height);
      if (isSizeChange) {
        el.style.setProperty('width', tempStyle.width);
        el.style.setProperty('height', tempStyle.height);
      }
      const x = el.offsetWidth / 2;
      const y = dragBar.offsetHeight / 2;
      startTop = event.clientY - startY;
      if (startTop > event.clientY - y || startTop < event.clientY - y * 2) {
        startTop = event.clientY - y;
      }
      startLeft = event.clientX - x;
      if (event.clientX < el.offsetWidth / 2) {
        startLeft = borderLeft;
      }
      if (event.clientX > maxWidth - el.offsetWidth / 2) {
        startLeft = maxWidth - el.offsetWidth;
      }
      isFullSize = false;
      return;
    }

    let top = startTop + deltaY;
    let left = startLeft + deltaX;

    if (top + 10 >= maxHeight - el.clientHeight) {
      top = maxHeight - el.clientHeight;
    }
    if (left <= 10) {
      left = borderLeft;
    }
    if (left + 10 > maxWidth - el.clientWidth) {
      left = maxWidth - el.clientWidth;
    }

    if (top <= 5) {
      /**
       * 進行最大化
       */
      if (isFullSize == false) {
        el.style.setProperty('max-width', maxWidth + 'px');
        el.style.setProperty('max-height', maxHeight + 'px');
        tempStyle.height = el.style.height;
        tempStyle.width = el.style.width;
        isFullSize = true;
        if (el.style.width != defaultStyle.width && el.style.height != defaultStyle.height) {
          console.log(el.style.width, el.style.height);
          console.log(defaultStyle.width, defaultStyle.height);
          isSizeChange = true;
        }
      }
      top = borderTop;
      left = borderLeft;
      el.style.width = plusPx(maxWidth);
      el.style.height = plusPx(maxHeight);
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
