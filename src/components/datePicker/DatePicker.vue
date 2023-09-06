<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    maximumYear?: number;
    minimumYear?: number;
    modelValue?: Date;
    size?: number;
  }>(),
  {
    maximumYear: 2188,
    minimumYear: 1922,
    size: 20,
    modelValue: () => new Date()
  }
);
const emit = defineEmits(['update:modelValue', 'click']);
const yearsSelect = computed(() => {
  const arr = [];
  for (let i = props.minimumYear; i <= props.maximumYear; i++) {
    arr.push(i);
  }
  return arr;
});

const monthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep ',
  'Oct',
  'Nov',
  'Dec'
];
const weekDayName = ['日', '一', '二', '三', '四', '五', '六'];

const updateValue = (date: Date) => {
  emit('update:modelValue', date);
};

const year = computed({
  get() {
    return props.modelValue.getFullYear();
  },
  set(val) {
    const d = new Date(props.modelValue);
    d.setFullYear(val);
    updateValue(d);
  }
});

const month = computed({
  get() {
    return props.modelValue.getMonth();
  },
  set(val) {
    const d = new Date(props.modelValue);
    d.setMonth(val);
    updateValue(d);
  }
});

const date = computed({
  get() {
    return props.modelValue.getDate();
  },
  set(val) {
    const d = new Date(props.modelValue);
    d.setDate(val);
    updateValue(d);
  }
});

const dateArr = computed(() => {
  const arr = [];
  const d = new Date(props.modelValue);
  d.setDate(1);
  const firstDay = d.getDay();

  for (let i = 0 - firstDay; i <= 42 - firstDay; i++) {
    const tdDate = new Date(d);
    tdDate.setDate(i);
    arr.push(tdDate);
  }
  return arr;
});
const ele = ref<HTMLElement | null>(null);
const changePosition = async (mode: 'datePicker' | 'monthPicker' | 'yearPicker') => {
  if (!mode) return;
  const target = ele.value?.querySelector('#' + mode) as HTMLElement;
  console.log(target);
  const left = target?.offsetLeft;
  const width = ele.value?.offsetWidth;
  if (!width) return;
  ele.value?.style.setProperty('left', `-${left}px`);
};
const yearSelectorWheel = (e: WheelEvent) => {
  if (e.deltaY < -50) {
    year.value = year.value - 1;
  } else if (e.deltaY > 50) {
    year.value = year.value + 1;
  }
};
const monthSelectorWheel = (e: WheelEvent) => {
  if (e.deltaY < -50) {
    month.value = month.value - 1;
  } else if (e.deltaY > 50) {
    month.value = month.value + 1;
  }
};
</script>

<template>
  <div class="date-picker" v-drag="'.date-picker .header'">
    <div class="header">
      <h2>
        <span style="cursor: pointer" @click.self="changePosition('yearPicker')">
          {{ year }} 年
        </span>
        <span style="cursor: pointer" @click.self="changePosition('monthPicker')">
          {{ month + 1 }}月
        </span>
        <span style="cursor: pointer" @click.self="changePosition('datePicker')">
          {{ date }}號
        </span>
      </h2>
      <div class="btnBox">
        <button
          @click="
            () => {
              month = month - 1;
              changePosition('datePicker');
            }
          "
        >
          ↑
        </button>
        <button
          @click="
            () => {
              month = month + 1;
              changePosition('datePicker');
            }
          "
        >
          ↓
        </button>
      </div>
    </div>
    <div class="tableWrap" ref="ele">
      <div id="yearPicker" class="picker">
        <div class="wrap" id="yearSelector" @wheel="yearSelectorWheel">
          <template v-for="i in yearsSelect">
            <template v-if="i > year - 4 && i < year + 4">
              <div
                :class="i == year ? 'selected' : ''"
                @click="
                  () => {
                    year = i;
                    changePosition('monthPicker');
                  }
                "
              >
                {{ i }}
              </div>
            </template>
          </template>
        </div>
      </div>
      <div id="monthPicker" class="picker" tabindex="-1">
        <div class="wrap">
          <template v-for="(name, index) in monthName">
            <div
              @click="
                () => {
                  month = index;
                  changePosition('datePicker');
                }
              "
            >
              <span>
                {{ name }}
              </span>
            </div>
          </template>
        </div>
      </div>
      <div
        id="datePicker"
        class="picker"
        @wheel="monthSelectorWheel"
        @keydown.right="date = date + 1"
        @keydown.left="date = date - 1"
        @keydown.up="date = date - 7"
        @keydown.down="date = date + 7"
        tabindex="-1"
        v-focus
      >
        <table rules="rows">
          <thead>
            <tr>
              <td v-for="name in weekDayName">{{ name }}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in 6">
              <td
                v-for="day in 7"
                :class="[
                  dateArr[day + (week - 1) * 7]?.getMonth() == month ? '' : 'none',
                  date == dateArr[day + (week - 1) * 7]?.getDate() &&
                  month == dateArr[day + (week - 1) * 7]?.getMonth()
                    ? 'selected'
                    : '',
                  day == 1 ? 'sunday' : '',
                  day == 7 ? 'saturdays' : ''
                ]"
                @click="
                  () => {
                    if (month == dateArr[day + (week - 1) * 7]?.getMonth())
                      emit('click', dateArr[day + (week - 1) * 7]);
                    updateValue(dateArr[day + (week - 1) * 7]);
                  }
                "
              >
                {{ dateArr[day + (week - 1) * 7]?.getDate() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width: v-bind('props.size+"rem"');
$rowHeight: calc($width / 7);
$font-size: 12px;

.date-picker {
  color: white;
  width: $width;
  border: solid;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  box-sizing: content-box;
  position: fixed;
  user-select: none;
  .header {
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.5em 1em;
    font-size: $font-size;
    position: relative;
    top: 0;
    left: 0;
    .btnBox {
      width: 20%;
      button {
        border-color: none;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        padding: 0.5em 0.2em;
        color: white;
        font-size: 1.2em;
        margin: 0 0.2em;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  .tableWrap {
    display: block;
    position: relative;
    width: calc($width * 3);
    transition: all ease-in-out 0.3s;
    left: calc($width * -2);
    // transform: translateX(-50%);
    .picker {
      width: $width;
      height: calc($width);
      display: inline-flex;
      // justify-content: center;
      // align-items: center;
    }
    #yearPicker {
      // background-color: rgb(83, 83, 83);
      flex-direction: column;
      align-items: center;
      .wrap {
        width: 100%;
        overflow-y: hidden;
        font-size: 1rem;
        div {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0.5rem;
          position: relative;
          cursor: pointer;
          &:nth-child(1),
          &:nth-child(7) {
            opacity: 0.2;
            font-size: 1em;
          }
          &:nth-child(2),
          &:nth-child(6) {
            opacity: 0.5;
            font-size: 1.6em;
          }
          &:nth-child(3),
          &:nth-child(5) {
            opacity: 0.8;
            font-size: 2em;
          }
          &.selected {
            font-size: 2.6em;
            &::after {
              content: '';
              width: 60%;
              height: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-bottom: rgba(255, 255, 255, 0.5) solid;
            }
          }
          &::after {
            content: '';
            width: 25%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-bottom: rgba(255, 255, 255, 0.5) solid 0.5px;
          }
        }
      }
    }
    #monthPicker {
      // background-color: rgb(11, 88, 88);
      .wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        div {
          // border: 1px solid;
          height: 2rem;
          aspect-ratio: 2/1;
          padding: 0.2rem 0.8rem;
          margin: 0.5rem 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          box-shadow: 1px 1px 3px 2px rgb(250, 250, 250);
          cursor: pointer;
        }
      }
    }
    #datePicker {
      font-size: $font-size;

      outline: none;
      // background-color: aqua;
      table {
        width: 100%;
        font-size: 1.2em;
        tr {
          height: $rowHeight;
          td {
            aspect-ratio: 1/1;
            text-align: center;
            &.sunday {
              color: rgb(255, 72, 0);
            }
            &.saturdays {
              color: rgb(255, 145, 0);
            }
            &.none {
              color: gray;
            }
          }
        }
        tbody {
          td {
            border: 0.2em solid rgb(255, 255, 255);
          }
          td:hover {
            background-color: rgba(255, 166, 0, 0.6);
          }
          .selected {
            background-color: orange;
          }
        }
      }
    }
  }
}
</style>
