import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import store from './storage/index'
Vue.config.productionTip = false
Vue.create
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),

}).$mount('#app')
