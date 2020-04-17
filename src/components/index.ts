import Vue from 'vue'
import { IInjecter } from '@/injecter/interface'
import UiMessage from './ui-message.vue'

const components = [UiMessage]

const componentInjecter: IInjecter = {
  execute: () => {
    for (const item of components) {
      Vue.component(item.name, item)
    }
  },
}

export { componentInjecter }
