import { ref } from 'vue';
//js UUID function
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useDrag = () => {
  const dragging = ref(false);
  const startX = ref(0);
  const startY = ref(0);
  const startTop = ref(0);
  const startLeft = ref(0);
  const top = ref(0);
  const left = ref(0);
  let target: HTMLElement | null = null;
  const initDrag = (event: MouseEvent) => {
    dragging.value = true;
    startX.value = event.clientX;
    startY.value = event.clientY;
    startTop.value = top.value;
    startLeft.value = left.value;
    // console.log(event.target)
    target = event.target as HTMLElement;
    target.style.position = 'absolute';
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  };

  const drag = (event: MouseEvent) => {
    if (!dragging.value) return;
    const deltaX = event.clientX - startX.value;
    const deltaY = event.clientY - startY.value;
    top.value = startTop.value + deltaY;
    left.value = startLeft.value + deltaX;
  };

  const stopDrag = () => {
    dragging.value = false;
    if (target) target.style.position = 'relative';
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };
  return { initDrag };
};

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
