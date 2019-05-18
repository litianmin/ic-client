import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
import axios from './request.js'
import Toast from 'muse-ui-toast'
import Loading from 'muse-ui-loading'
import './registerServiceWorker'

Vue.prototype.$axios = axios
// axios.defaults.baseURL = "/api"
// axios.defaults.baseURL = "127.0.0.1：8888"

// 这是我自己加入的
// BEGIN 使用 muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper, /* { default global options } */)


import 'muse-ui-message/dist/muse-ui-message.css'
import Message from 'muse-ui-message'
Vue.use(Message)

// 加载支持svg
import './icons/index'

Vue.use(Toast, {
  position: 'top'
})
Vue.use(Loading)

// END 使用muse-ui

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
