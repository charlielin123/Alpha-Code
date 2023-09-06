<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
};
</script>

<script setup lang="ts">
import { computed, ref, type DirectiveBinding, type VNode, nextTick } from 'vue';
import DatePicker from './DatePicker.vue';
import moment from 'moment';
const props = defineProps({
  format: {
    type: String,
    default: 'yyyy/MM/DD',
    require: false
  },
  modelValue: {
    type: String
  }
});
const emit = defineEmits(['update:modelValue']);
const datePicker = ref<{ selectDate: Date }>();
const show = ref(false);
const ele = ref<HTMLElement>();
const date = computed({
  get() {
    if(!props.modelValue) return new Date()
    return new Date(moment(props.modelValue).format('yyyy/MM/DD'));
  },
  set(val) {
    const str = moment(val).format(props.format);
    emit('update:modelValue', str);
  }
});
const dateString = computed(() => {
  if (!props.modelValue) return '';
  try {
    const a = new Date(props.modelValue);

    return moment(props.modelValue).format(props.format);
  } catch (error) {
    return '';
  }
});

const fun = (e: MouseEvent) => {
  if (show.value == false) return;
  const target = e.target as HTMLElement;
  if (!ele.value) return;
  if (target.contains(ele.value)) {
    show.value = false;
  }
};

const vClickOutside = {
  mounted: (el: HTMLElement, bind: DirectiveBinding, vNode: VNode) => {
    const fun = bind.value;
    document.body.addEventListener('click', fun);
  },
  unmounted: (el: HTMLElement, bind: DirectiveBinding, vNode: VNode) => {
    const fun = bind.value;
    document.body.removeEventListener('click', fun);
  }
};
const test = async (e: Event) => {
  const target = (e as InputEvent).target as HTMLInputElement;
  const value = target.value;
  const yIndex = props.format.lastIndexOf('y');
  const mIndex = props.format.lastIndexOf('M');
  const dIndex = props.format.lastIndexOf('D');
  const selectionStart = target.selectionStart;
  if (!selectionStart) return;
  function isValidDate(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
  if (!isValidDate(value)) return;
  const updateValue = async (index: number, next?: 'M' | 'D') => {
    emit('update:modelValue', value);
    if (
      next == 'M' &&
      props.format.indexOf('M') == selectionStart - 1 &&
      parseInt(value.charAt(selectionStart - 1)) > 1
    ) {
      console.log('stop');
    }
    if (selectionStart == index + 1) {
      await nextTick();
      if (!next) return;
      target.select();
      target.setSelectionRange(props.format.indexOf(next), target.value.length);
    }
  };
  selectionStart == yIndex + 1 && updateValue(yIndex, 'M');
  selectionStart == mIndex + 1 && updateValue(mIndex, 'D');
  selectionStart == dIndex + 1 && updateValue(dIndex);
};
</script>

<template>
  <div ref="ele" v-clickOutside="fun" @keydown.enter="show = false">
    <input type="text" @click="show = true" :value="dateString" @input="test" :="$attrs" />
    <DatePicker ref="datePicker" v-if="show" v-model="date" @click="show = false" />
  </div>
</template>

<style lang="scss" scoped></style>
