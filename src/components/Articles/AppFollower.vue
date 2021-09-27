<template>
<v-container>
  <app-article-list :loadDefault="false"></app-article-list>
</v-container>
</template>

<script>
import AppArticleList from "./AppArticleList";
import Request from "../../mixins/Request";
export default {
  name: "AppFollower",
  mixins:[Request],
  created() {
    this.$root.$refs.loadContent = function (page){
      const body = {
        filters:{
          follower:1
        },
        page:page
      }
      return this.authRequest('follower', 'POST', body)
    }.bind(this)
  },
  components:{
    AppArticleList
  }
}
</script>

<style scoped>

</style>