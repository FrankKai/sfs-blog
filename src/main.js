// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'normalize.css/normalize.css'
import store from './store'
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(VueSocketio, 'http://localhost:3001');
Vue.use(VueSocketio, socketio('http://localhost:3001'));
import bus from '@/plugins/bus';

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(bus);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
