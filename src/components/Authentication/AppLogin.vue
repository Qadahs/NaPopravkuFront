<template>
  <v-container style="max-width: 400px">

    <v-form class="ma-auto width">
      <v-alert v-for="error in errors" type="warning" :key="error">{{ error }}</v-alert>
      <v-text-field v-model="userLogin"
                    label="Логин"
      ></v-text-field>

      <v-text-field
          v-model="userPassword"
          label="Пароль"
          type="password"
      ></v-text-field>
      <v-btn @click="login">Авторизоваться</v-btn>

    </v-form>
    <div class="mt-5 d-flex justify-end">
      <router-link to="/register" style="text-decoration:none">К регистрации</router-link>
    </div>
  </v-container>
</template>

<script>
import RouteMixin from "../../mixins/Route";
import Request from "../../mixins/Request";


export default {
  mixins: [RouteMixin,Request],
  data() {
    return {
      userLogin: '',
      userPassword: '',
      errors: null,
    }
  },
  mounted() {
    if (this.$store.getters.getAuth) this.navigate('/');
  },
  methods: {
    login() {
      let data = {
        'login': this.userLogin,
        'password': this.userPassword
      }
      this.request('login', 'POST', data)
          .then(({data}) => {
            this.$store.commit('setUser', {token: data.data.token, user: data.data.user})
            this.navigate('/')
          }).catch(
          ({response}) => {
            this.errors = this.parseErrors(response.data.errors)
          });
    }
  }
}
</script>
