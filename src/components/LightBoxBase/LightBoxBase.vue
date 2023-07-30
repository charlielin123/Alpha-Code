<script>
// @ts-check
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
};
</script>
<script setup>
// @ts-check
import { computed, onMounted, reactive, ref, watch, toRef } from 'vue';
import { useMessage } from '@/components';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { showMessage } = useMessage();

const props = defineProps({
  /**
   * 燈箱開關
   */
  modelValue: {
    // type: Boolean,
    required: false,
    default: false,
  },
  style: {
    type: Object,
  },
  /**
   * LightBoxBody的CSS
   */
  body_style: {
    required: false,
    type: Object,
  },
  /**
   * 關閉footer的關閉按鈕
   */
  dis_close_btn: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 關閉title的X按鈕
   */
  dis_close_icon: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 點選燈箱外是否關閉燈箱
   */
  backdrop: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 按ESC是否關閉燈箱
   */
  esc: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 關閉title的顯示
   */
  dis_title: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 關閉footer的顯示
   */
  dis_footer: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 能否拖動視窗
   */
  draggable: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 燈箱的z-index
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 關閉視窗前執行的Function
   */
  beforeClose: {
    type: Function,
    required: false,
    default: () => {},
  },
});
const modelValue = toRef(props, 'modelValue');

const emit = defineEmits(['update:modelValue', 'close']);
const close = () => {
  document.body.setAttribute('style', '');
  // props.beforeClose();
  emit('close');
  emit('update:modelValue', false);
};
defineExpose({ close });

/**
 * element
 * @type {import('vue').Ref<HTMLElement|null>}
 */
const box = ref(null);
/**
 * @type {import('vue').Ref<HTMLElement|null>}
 */
const modalElement = ref(null);
/**
 * @type {import('vue').Ref<HTMLElement|null>}
 */
const outSideContainer = ref(null);
/**
 * 點擊燈箱外觸發
 * 如果有prop backdrop 則關閉視窗
 */
const clickOutside = (e) => {
  const animationKey = [
    { transform: 'scale(1)' },
    { transform: 'scale(1.02)' },
    { transform: 'scale(1)' },
  ];

  if (props.backdrop) {
    close();
  } else {
    showMessage.warning('請先結束當前工作');
    modalElement.value?.animate(animationKey, {
      duration: 500,
      iterations: 1,
    });
  }
};

/**
 * z-index
 */
const outsideZIndex = computed(() => {
  if (props.zIndex) {
    return 'z-index:' + props['zIndex'] + ';';
  }
  return '';
});
const autoFocusIn = () => {
  if (props.modelValue && box.value instanceof HTMLElement) {
    box.value?.focus();
  }
};

/**
 * @type {import('vue').Ref<{left?:string,top?:string,width?:string,height?:string,userSelect?:string,maxWidth?:string,maxHeight?:string}>}
 */
const positionChange = ref({});
const absoluteXY = {
  x: 0,
  y: 0,
};
const move = {
  x: 0,
  y: 0,
};

const dragEvent = reactive({
  up() {
    outSideContainer.value.removeEventListener('mousemove', dragEvent.dragging);
  },
  dragging(e) {
    if (e.clientX == 0 || e.clientY == 0) {
      return;
    }
    let x = absoluteXY.x + e.clientX - move.x;
    let y = absoluteXY.y + e.clientY - move.y;
    const width = modalElement.value?.clientWidth;
    const vw = outSideContainer.value?.clientWidth;
    const height = modalElement.value?.clientHeight;
    const vh = outSideContainer.value?.clientHeight;
    if (y <= vw * 0.01) {
      y = 0;
      // this.test.width = '100%';
      // this.test.height = '100%';
      positionChange.value.width = '100%';
      positionChange.value.height = '100%';
      positionChange.value.maxWidth = '100vw';
      positionChange.value.maxHeight = '100vh';
    } else {
      // delete this.test.width;
      // delete this.test.height;
      delete positionChange.value.maxWidth;
      delete positionChange.value.maxHeight;
      delete positionChange.value.width;
      delete positionChange.value.height;
    }
    if (x <= vh * 0.01) {
      x = 0;
    }
    if (vw && width && x + 30 >= vw - width) {
      x = vw - width;
    }
    if (vh && height && y + 30 >= vh - height) {
      y = vh - height;
    }
    // this.test.left = `${x}px`;
    // this.test.top = `${y}px`;
    positionChange.value.left = `${x}px`;
    positionChange.value.top = `${y}px`;
  },
  /**
   *
   * @param {MouseEvent} e
   */
  dragStart(e) {
    absoluteXY.x = modalElement.value?.offsetLeft ?? 0;
    absoluteXY.y = modalElement.value?.offsetTop ?? 0;
    if (
      positionChange.value.width == '100%' &&
      positionChange.value.height == '100%'
    ) {
      move.x = e.offsetX;
      move.y = e.offsetY;
    }
    move.x = e.clientX;
    move.y = e.clientY;
    positionChange.value.userSelect = 'none';
    outSideContainer.value.addEventListener('mousemove', dragEvent.dragging);
    document.addEventListener('mouseup', dragEvent.up, {
      once: true,
    });
  },
});

const propStyle = computed(() => {
  const style = props.style?.value ?? props.style;
  return { ...style, ...positionChange.value };
});

onMounted(() => {
  autoFocusIn();
});

watch(
  () => props.modelValue,
  () => {
    positionChange.value = {};
    autoFocusIn();
  }
);
</script>

<template>
  <div ref="box" tabindex="-1" @keydown.esc="props.esc ? close : ''">
    <transition name="lightBox">
      <div
        class="outSideContainer"
        ref="outSideContainer"
        v-if="modelValue"
        @click.self="clickOutside($event)"
        :style="outsideZIndex"
      >
        <div class="lightBox" :="$attrs" :style="propStyle" ref="modalElement">
          <div
            class="header"
            v-if="!props.dis_title"
            @mousedown="draggable ? dragEvent.dragStart($event) : ''"
            :style="draggable ? 'cursor: move;' : ''"
          >
            <slot name="header">
              <h4 class="title">
                <slot name="title">{{ t('lightBoxBase.alert') }}</slot>
              </h4>
            </slot>
            <button
              class="btn-close"
              v-if="!props.dis_close_icon"
              @click="close"
            ></button>
          </div>
          <div  style="margin-top: 0.5rem">
            <slot name="navBox"></slot>
          </div>
          <div class="lightBoxBody" :style="body_style">
            <slot name="body"></slot>
          </div>
          <div class="footer" v-if="!dis_footer">
            <slot name="footer"> </slot>

            <button @click="close" v-if="!props.dis_close_btn">
              {{ t('lightBoxBase.close') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.outSideContainer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1055;
  background-color: rgba(0, 0, 0, 0.5);
  // opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;

  .lightBox {
    z-index: 1056;
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 10rem;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    .header {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1rem;
      border-bottom: 1px solid #dee2e6;
      border-top-left-radius: calc(0.3rem - 1px);
      border-top-right-radius: calc(0.3rem - 1px);
      .title {
        padding: 0;
        margin: 0;
        margin-bottom: 0;
        line-height: 1.5rem;
        font-size: 1.5rem;
      }
      .btn-close {
        cursor: pointer;
        box-sizing: content-box;
        width: 1em;
        height: 1em;
        padding: 0.5rem 0.5rem;
        color: #000;
        opacity: 0.5;
        background: transparent
          url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
          center/1em auto no-repeat;
        border: 0;
        border-radius: 0.25rem;
      }
    }
    .lightBoxBody {
      overflow-y: auto;
      overflow-x: hidden;
      padding: 1rem;
      padding-top: 0;
      position: relative;
      flex: 1 1 auto;
    }
    .footer {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      align-items: center;
      justify-content: flex-end;
      padding: 0.75rem;
      border-top: 1px solid #dee2e6;
      border-bottom-right-radius: calc(0.3rem - 1px);
      border-bottom-left-radius: calc(0.3rem - 1px);
      button {
        color: #fff;
        margin: 0.25rem;
        background-color: #6c757d;
        border-color: #6c757d;
        display: inline-block;
        font-weight: 400;
        line-height: 1.5rem;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        // background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }
    }
  }
}

.lightBox-enter-active,
.lightBox-leave-active {
  transition: all 0.15s linear;
}

.lightBox-enter-from,
.lightBox-leave-to {
  // transform: translateX(-50px);
  opacity: 0;
}
.lightBox-enter-active .lightBox,
.lightBox-leave-active .lightBox {
  transition: all 0.3s ease-out;
}

.lightBox-enter-from .lightBox,
.lightBox-leave-to .lightBox {
  transform: translateY(-50px);
}
</style>
