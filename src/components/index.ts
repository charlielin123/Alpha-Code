import { type App } from 'vue'
import AutoFocusInInput from '@/components/input/AutoFocusInInput.vue'

export const install = (app: App) => {
  app.component('AutoFocusInInput', AutoFocusInInput)
}


