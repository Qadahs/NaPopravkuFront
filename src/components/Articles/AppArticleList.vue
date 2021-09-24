<template>
  <div>
    <v-container class="grey lighten-5" >
      <v-row no-gutters>
        <template
            v-for="(article,idx) in articles">
          <v-col :key="article.id">
            <app-card :article="article" class="mb-3"></app-card>
          </v-col>
          <v-responsive
              v-if="(idx+1) % 2==0"
              :key="`width-${(idx+1)}`"
              width="100%"
          ></v-responsive>
        </template>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination
          v-if="!loading"
          @input="routeToPage"
          v-model="currentPage"
          :length="pagesCount"
          circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import AppCard from "./components/AppCard";
import axios from 'axios';
import RouteMixin from "../../mixins/RouteMixin";
export default {
  name: "AppLayout",
  mixins:[RouteMixin],
  data(){
    return {
      articles:[],
      pagesCount:1,
      currentPage:1,
      loading:true,
    }
  },
  mounted() {
   axios.get('http://localhost/api/article').then(({data})=>{
     this.loading=false;
     this.parseArticle(data)}
   )
    axios.get('http://localhost/api/article/count').then(({data})=>{this.pagesCount=data.data.count}).catch(err=>{
      console.log(err)})
  },
  methods: {
    parseArticle(data)
    {
      if(!data.errors){
        this.articles=data.data.articles
      }
    },
    routeToPage(){
      axios.get(`http://localhost/api/article?page=${this.currentPage}`).then(({data})=>{this.parseArticle(data)}).catch(err=>{
        console.log(err)})
    }
  },
  components:{
    AppCard
  },


}
</script>

<style scoped>

</style>