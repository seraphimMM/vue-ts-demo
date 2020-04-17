import Vue from 'vue'
import { IInjecter } from '@/injecter/interface'

const filterInjecter: IInjecter = {
  execute: () => {
    // 将数字转换为千分位显示
    Vue.filter('number', (v: number, precision?: number) => {
      precision = precision || 1
      return v.toFixed(precision).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    })
  },
}

export { filterInjecter }
