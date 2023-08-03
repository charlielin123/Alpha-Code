import type { DirectiveBinding, VNode } from 'vue';

export default (el: HTMLInputElement, bind: DirectiveBinding, vNode: VNode) => {
  let resizing = false;
  let resizeDirection: string;
  let startX = 0;
  let startY = 0;
  let startTop: number;
  let startLeft: number;
  let startWidth = 0;
  let startHeight = 0;
  let windowWidth = 0;
  let windowHeight = 0;
  const initResize = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizing = true;
    resizeDirection = (e.target as HTMLElement)?.className;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = el.clientWidth;
    startHeight = el.clientHeight;
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    startTop = el.offsetTop;
    startLeft = el.offsetLeft;

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  };
  const ref = [
    'top',
    'right',
    'bottom',
    'left',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight'
  ];
  el.style.position = 'absolute';
  for (let i = 0; i < ref.length; i++) {
    let ele = document.createElement('div');
    ele.classList.add(ref[i]);
    ele.addEventListener('mousedown', initResize);
    const mixCss: { [key: string]: string } = { ...resizeHandle, ...style[ref[i]] };
    for (const key in mixCss) {
      ele.style[key] = mixCss[key];
    }
    el.appendChild(ele);
  }

  const resize = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!resizing) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const eStyle = el.style;
    const topAction = () => {
      eStyle.top = '';
      eStyle.bottom = plusPx(windowHeight - startHeight - startTop);
      eStyle.height = plusPx(startHeight - deltaY);
    };
    const bottomAction = () => {
      eStyle.bottom = '';
      eStyle.top = plusPx(startTop);
      eStyle.height = plusPx(startHeight + deltaY);
    };
    const leftAction = () => {
      eStyle.left = '';
      eStyle.right = plusPx(windowWidth - startWidth - startLeft);
      eStyle.width = plusPx(startWidth - deltaX);
    };

    const rightAction = () => {
      eStyle.right = '';
      eStyle.left = plusPx(startLeft);
      eStyle.width = plusPx(startWidth + deltaX);
    };

    switch (resizeDirection) {
      case 'top':
        topAction();
        break;
      case 'right':
        rightAction();
        break;
      case 'bottom':
        bottomAction();
        break;
      case 'left':
        leftAction();
        break;
      case 'topLeft':
        topAction();
        leftAction();
        break;
      case 'topRight':
        topAction();
        rightAction();
        break;
      case 'bottomLeft':
        bottomAction();
        leftAction();
        break;
      case 'bottomRight':
        bottomAction();
        rightAction();
        break;
    }
  };
  const stopResize = () => {
    resizing = false;
    resizeDirection = '';
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  };
};
const plusPx = (a: number) => {
  return a + 'px';
};

const resizeHandle: { [key: string]: string } = {
  position: 'absolute',
  zIndex: '1056',
  width: '10px',
  height: '10px'
  // backgroundColor: 'rgb(240, 0, 0)'
  // border: 1px solid black;
};

const top = {
  top: '-5px',
  left: '50%',
  width: 'calc(100% - 10px)',
  transform: 'translateX(-50%)',
  cursor: 'ns-resize'
};

const right = {
  top: '50%',
  right: '-5px',
  height: 'calc(100% - 10px)',
  transform: 'translateY(-50%)',
  cursor: 'ew-resize'
};

const bottom = {
  bottom: '-5px',
  left: '50%',
  width: 'calc(100% - 10px)',
  transform: 'translateX(-50%)',
  cursor: 'ns-resize'
};

const left = {
  top: '50%',
  left: '-5px',
  height: 'calc(100% - 10px)',
  transform: 'translateY(-50%)',
  cursor: 'ew-resize'
};

const topLeft = {
  top: '-5px',
  left: '-5px',
  cursor: 'nwse-resize'
};

const topRight = {
  top: '-5px',
  right: '-5px',
  cursor: 'nesw-resize'
};

const bottomLeft = {
  bottom: '-5px',
  left: '-5px',
  cursor: 'nesw-resize'
};

const bottomRight = {
  bottom: '-5px',
  right: '-5px',
  cursor: 'nwse-resize'
};
const style: { [key: string]: { [key: string]: string } } = {
  top,
  right,
  bottom,
  left,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight
};
