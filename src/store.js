import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usrWindowIsShow: false
  },
  mutations: {
    usrWindowToggle: state => {return state.usrWindowIsShow = !state.usrWindowIsShow}
  },
  actions: {

  }
})
