import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Registry from '@/components/pages/Registry'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'ShoppingMall', component: ShoppingMall },
    { path: '/registry', name: 'Registry', component: Registry },
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/goods', name: 'Goods', component: Goods, meta: {
        keepAlive: true
      }
    },
    { path: '/categoryList', name: 'CategoryList', component: CategoryList },
    { path: '/cart', name: 'Cart', component: Cart }
  ]
})
