import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'

// 全局路由控制，一般我建议路由跳转全部使用强类型来约束而非vue router
export const enum Direction {
  Login = 0,
  Home = 1,
  UserManager,
  SystemManager,
  ControlPanel,
  CustomerService
}

Vue.use(Router)

interface IInnerRoute {
  path: string
  name: string
  component: any
  direction: Direction
}

const innerRouters: IInnerRoute[] = []

const buildRouters = () => {
  innerRouters.push({
    path: '/',
    name: 'login',
    component: Login,
    direction: Direction.Login,
  })

  innerRouters.push({
    path: '/home',
    name: 'home',
    component: () => import('./views/home.vue'),
    direction: Direction.Home,
  })
}

buildRouters()

Vue.prototype.go = function(direction: Direction, query: any) {
  const target = innerRouters.find((i) => i.direction === direction)
  target && this.$router.push(target.path, query)
}
Vue.prototype.go4Params = function(direction: Direction, params: any) {
  const target = innerRouters.find((i) => i.direction === direction)
  target && this.$router.push({ name: target.name, params })
}

export default new Router({
  routes: innerRouters,
})
