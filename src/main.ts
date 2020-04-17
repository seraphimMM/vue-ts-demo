import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注入全局依赖
import './injecter/index'
// 注入全局filters, directives等
import './filters/index'

// 注入全局样式
import './css/index.less'
// 引入element ui 的主样式
import 'element-ui/lib/theme-chalk/index.css'

import { IService } from './services/service'
import { IPopupService } from './injecter/interface'

import { Direction } from '@/router'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// 这里为全局vue示例申明那些属性可以挂载，实际注入逻辑在 injecter文件夹下完成
declare module 'vue/types/vue' {
  interface Vue {
    service: IService
    popup: IPopupService

    // 全局路由跳转支持，不推荐用$router 来实施，使用强类型来约束更有利于全局路由的控制
    go(direction: Direction, query?: any): void
    go4Params(direction: Direction, params?: any): void

    // 全局loading控制器，如果需要遮住全部页面，只需要调用全局函数即可，如果需要额外部分区域遮罩，请自行使用loading组件控制
    // 全局loading 注入在 App.vue 中实现
    controlLoading(busy: boolean): void
  }
}
