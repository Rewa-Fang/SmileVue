import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,Row,Col,Swipe,SwipeItem,Lazyload,List,NavBar,Field,Cell, CellGroup,Tab,Tabs} from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field).use(Cell).use(CellGroup).use(Tab).use(Tabs);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
