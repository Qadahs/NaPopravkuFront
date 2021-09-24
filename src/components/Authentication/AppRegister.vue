<template>
  <v-container style="max-width: 400px">

    <v-alert v-for="error in errors" type="warning" :key="error">{{ error }}</v-alert>
    <v-form class="ma-auto width">
      <v-text-field
          label="Login"
          v-model="userLogin"
      ></v-text-field>
      <v-text-field
          label="Password"
          type="password"
          v-model="userPassword"
      ></v-text-field>
      <v-text-field
          label="Repeat Password"
          type="password"
          v-model="userRepeatPassword"
      ></v-text-field>
      <v-btn @click="register">Регистрация</v-btn>
      <div  class="mt-5 mx-auto">
        <router-link to="/login" > <v-btn color="primary">К авторизации</v-btn></router-link>
      </div>


    </v-form>

  </v-container>
</template>

<script>
import axios from "axios";
import RouteMixin from "../../mixins/RouteMixin";

export default {
  mixins:[RouteMixin],
  name: "AppRegister",
  data(){
    return {
      userLogin:'',
      userPassword:'',
      userRepeatPassword:'',
      errors: null,
    }
  },
  mounted() {
    if(this.$store.getters.getAuth) this.navigate('/');
  },
  methods:{
    register(){
      let data = {
        'login':this.userLogin,
        'password':this.userPassword,
        'password_confirmation':this.userRepeatPassword
      }
      axios.post('http://localhost/api/register',data).then(({data})=>{
        this.$store.commit('setUser',{token:data.data.token,user:data.data.user})
        this.navigate('/')
      }).catch(({response})=>{
        this.errors = this.parseErrors(response.data.errors)
      })
    }
  }
}
</script>

<style scoped>

</style>