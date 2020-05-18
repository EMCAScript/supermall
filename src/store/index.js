import Vue from "vue"
import Vuex from "vuex"
//1 安装插件
Vue.use(Vuex)

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

const state =  {
    cartList: []
}

//2创建Store对象
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

//3 挂载vue实例上
export default store