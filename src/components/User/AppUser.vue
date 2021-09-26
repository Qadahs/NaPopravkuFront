<template>
  <v-container>

    <v-container class="justify-center" style="max-width: 800px">
      <div class="d-sm-flex justify-space-between">
        <h1>{{ user.login }}</h1>
        <v-spacer></v-spacer>
        <v-btn>Подписаться</v-btn>
      </div>
      <h3 class="mt-5">Цитаты пользователя:</h3>
    </v-container>

    <app-article-list :loadDefault="false"></app-article-list>

  </v-container>
</template>

<script>
import AppArticleList from "../Articles/AppArticleList";
import Request from '../../mixins/Request';

export default {
  name: "AppUser",
  mixins: [Request],
  data() {
    return {
      user: this.$route.params.user
    }
  },
  created() {
    this.$root.$refs.loadContent = function (page){
      const body = {
        filters:{
          user: this.user.id,
        },
        page:page
      }
      return this.request('article/filter', 'POST', body)
    }.bind(this)
  },
  components: {
    AppArticleList
  }
}
</script>

<style scoped>

</style>