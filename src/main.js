import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import store from './storage/index'
import axios from "axios";
// Define domain of backend server
const domain = 'http://localhost'

Vue.config.productionTip = false
Vue.create
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  mounted() {
   this.tryAuth()
  },
  methods:
      {
          tryAuth(){
               if(this.$store.getters.getToken)
               {
                  axios.get('http://localhost/api/auth',{
                      headers:{
                          'Authorization':`Bearer ${this.$store.getters.getToken}`
                      }
                  }).then(({data})=>{
                      this.$store.commit('setUser',{token:this.$store.getters.getToken,user:data.data.user})
                  }).catch(({response})=>{
                      console.log(response.message)
                  })
               }

        },
          auth(){
              return this.$store.getters.getAuth
          }
      }
}).$mount('#app')
export default domain;