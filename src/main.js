import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'

import toast from 'components/common/toast'
//安装toast插件
Vue.use(toast)

Vue.config.productionTip = false

//解决移动端300ms延迟
FastClick.attach(document.body)

//添加事件总线
//new Vue()实例可以作为事件总线
Vue.prototype.$bus = new Vue()


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

