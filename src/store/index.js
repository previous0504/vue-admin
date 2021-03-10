import Vue from 'vue'
import Vuex from 'vuex'
import {
  HttpUtil
} from "../utils/request.js";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: null,
  },
  mutations: {
    set_admin(state, arg) {
      state.role = arg;
    },
  },
  actions: {
    async login({
      commit
    }, arg) {
      let res = await HttpUtil.post(`/login`,arg);
      commit('set_admin', res.data);
     
    },
    async logOut({
      commit
    }, arg) {
      commit('set_admin', null);
      localStorage.setItem('set_admin', null);
    },
  },
  modules: {}
})