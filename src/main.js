// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MyHttpserver from '@/plugins/http.js'
import '@/assets/css/reset.css'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyHttpserver)
/* eslint-disable no-new */

Vue.filter('formdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
