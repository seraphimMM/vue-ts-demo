import Vue from 'vue'
import { IInjecter } from './interface'
import { service } from '@/services/service'

const environment: IInjecter = {
  execute: () => {
    Vue.prototype.service = service
  },
}

export { environment }
