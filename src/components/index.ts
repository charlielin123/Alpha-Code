import { type App, type DirectiveBinding } from 'vue'
import AutoFocusInInput from '@/components/input/AutoFocusInInput.vue'

const vFocus = {
  mounted: (el: HTMLElement) => {
    el.focus()
  }
}
function resize(event: Event) {
  const ele = event.target as HTMLElement
  ele.style.height = 'auto'
  ele.style.height = ele.scrollHeight + 'px'
}
const vAutoHeight = {
  mounted: (el: HTMLElement, binding: DirectiveBinding<any>) => {
    let maxHeight = binding?.value
    console.log(maxHeight)
    el.style.height = 'auto'
    el.style.maxHeight = maxHeight
    el.addEventListener('input', resize)
  },
  unmounted: (el: HTMLElement, binding: DirectiveBinding<{ maxHeight: string }>) => {
    el.removeEventListener('input', resize)
  }
}

export const install = (app: App) => {
  app.component('AutoFocusInInput', AutoFocusInInput)
  app.directive('focus', vFocus)
  app.directive('autoHeight', vAutoHeight)
}
