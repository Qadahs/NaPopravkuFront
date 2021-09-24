<template>
  <v-container style="max-width: 400px">

 <v-form class="ma-auto width">
   <v-alert v-for="error in errors" type="warning" :key="error">{{ error }}</v-alert>
   <v-text-field v-model="userLogin"
   label="Login"
   ></v-text-field>

   <v-text-field
       v-model="userPassword"
       label="Password"
       type="password"
   ></v-text-field>
  <v-btn @click="login" >Авторизоваться</v-btn>

 </v-form>
    <div  class="mt-5 mx-auto">
      <router-link to="/register" > <v-btn color="primary">К регистрация</v-btn></router-link>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import RouteMixin from "../../mixins/RouteMixin";



export default {
  mixins:[RouteMixin],
  data(){
    return {
      userLogin:'',
      userPassword:'',
      errors: null,
    }
  },
  mounted() {
    if(this.$store.getters.getAuth) this.navigate('/');
  },
  methods:{
     login(){
      let data = {
          'login':this.userLogin,
          'password':this.userPassword
      }
       axios.post('http://localhost/api/login',data).then(({data})=>{
         this.$store.commit('setUser',{token:data.data.token,user:data.data.user})
         this.navigate('/')
     }).catch(({response})=>{
       this.errors = this.parseErrors(response.data.errors)
     })
    }
  }
}
</script>
