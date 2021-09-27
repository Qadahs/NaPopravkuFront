<template>
  <v-container style="max-width: 400px">

    <v-alert v-for="error in errors" type="warning" :key="error">{{ error }}</v-alert>
    <v-form class="ma-auto width">
      <v-text-field
          label="Логин"
          v-model="userLogin"
      ></v-text-field>
      <v-text-field
          label="Пароль"
          type="password"
          v-model="userPassword"
      ></v-text-field>
      <v-text-field
          label="Подтверждение"
          type="password"
          v-model="userRepeatPassword"
      ></v-text-field>
      <v-btn @click="register">Регистрация</v-btn>
      <div class="mt-5 d-flex justify-end">
        <router-link to="/login" style="text-decoration:none">К авторизации</router-link>
      </div>
    </v-form>

  </v-container>
</template>

<script>
import RouteMixin from "../../mixins/Route";
import Request from "../../mixins/Request";

export default {
  mixins: [RouteMixin, Request],
  name: "AppRegister",
  data() {
    return {
      userLogin: '',
      userPassword: '',
      userRepeatPassword: '',
      errors: null,
    }
  },
  mounted() {
    if (this.$store.getters.getAuth) this.navigate('/');
  },
  methods: {
    register() {
      let data = {
        'login': this.userLogin,
        'password': this.userPassword,
        'password_confirmation': this.userRepeatPassword
      }
      this.request('register', 'POST', data)
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

<style scoped>

</style>