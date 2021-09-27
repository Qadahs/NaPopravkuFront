<template>
  <v-container v-if="loaded" class="justify-center mt-10"  style="max-width: 800px">
    <app-card :article="article"></app-card>

      <v-btn v-if="$store.getters.getAuth && article.user.id === $store.getters.getUser.id" class="d-flex mx-auto mt-10" @click="deleteArticle">Delete</v-btn>
  </v-container>

</template>

<script>
import AppCard from "./components/AppCard";
import Request from "../../mixins/Request";
import Route from "../../mixins/Route";
export default {
  name: "AppArticle",
  mixins:[Request,Route],
  data(){
    return {
      article:null,
      loaded:false,
    }
  },
  methods:{
    deleteArticle(){
      this.authRequest(`article?id=${this.article.article.id}`,'DELETE').catch(()=>{})
      this.navigate('/')
      this.$root.$refs.loadPage()
    },
    getArticle()
    {
      if(this.$route.params.article)
      {
        console.log(this.$route.params.article)
        this.article= this.$route.params.article
        this.loaded=true
      }
      else {
        let data = {
          filters:{
            article:this.$route.params.id
          }
        }
        this.request('public/article','POST',data)
            .then(
                ({data})=>{
                  this.article=data.data.articles[0];
                  this.loaded=true
                })
            .catch(()=>{})
      }
    }
  },
  created() {
    this.getArticle();
  },
  components:{
    AppCard
  }
}
</script>

<style scoped>

</style>