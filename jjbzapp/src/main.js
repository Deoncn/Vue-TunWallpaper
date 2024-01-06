import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import store from './store/index';

import './assets/main.css'
// vuetify.js 配置vuetify
import vuetify from './plugins/vuetify'


// 挂载全局
Vue.config.productionTip = true
Vue.prototype.$axios = axios // ajax请求方法

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store,
}).$mount('#app')


