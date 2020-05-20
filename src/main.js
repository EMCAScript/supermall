import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
//安装toast插件
Vue.use(toast)

Vue.config.productionTip = false

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  // loading:require('assets/img/common/placeholder.png')
  loading:require('assets/img/common/007rAy9hgy1g24by9t530j30i20i2glm.jpg')
})

//添加事件总线
//new Vue()实例可以作为事件总线
Vue.prototype.$bus = new Vue()

import "assets/css/iconfont.css"; 

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

