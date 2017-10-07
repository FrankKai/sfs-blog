// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
// import Bootstrap from 'bootstrap'
// import Jquery from 'jquery'
// import store from './store/'
// import './style/common.less'
// import './style/bootstrap.min.css'
// import mock from './api/mock.js'

Vue.config.productionTip = false
Vue.use(Element)
// Vue.use(Jquery)
// Vue.use(Bootstrap)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
