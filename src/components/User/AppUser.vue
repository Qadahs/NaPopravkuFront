<template>
  <v-container>

    <v-container class="justify-center" style="max-width: 800px" >
      <div class="d-sm-flex justify-space-between">
      <h1>{{user.login}}</h1>
        <v-spacer></v-spacer>
      <v-btn>Подписаться</v-btn>
      </div>
      <h3 class="mt-5">Цитаты пользователя:</h3>
    </v-container>


  <app-article-list></app-article-list>

  </v-container>
</template>

<script>
import AppArticleList from "../Articles/AppArticleList";
export default {
  name: "AppUser",
  data(){
    return {
      user:this.$route.params.user
    }
  },
  mounted() {
    console.log(this.user)
  },
  components:{
    AppArticleList
  }
}
</script>

<style scoped>

</style>