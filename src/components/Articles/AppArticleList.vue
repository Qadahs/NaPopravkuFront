<template>
  <v-container v-if="isLoading" fill-height fluid style="width: 150px" >
    <v-progress-circular
        :size="150"
        color="primary"
        indeterminate
    ></v-progress-circular>
  </v-container>
  <div v-else>
    <v-container class="grey lighten-5 justify-center" style="max-width: 800px;">
      <v-row no-gutters justify="space-around">
        <template
            v-for="(article,idx) in articles">
          <v-col offset="0"  :key="article.id">
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
          v-model="currentPage"
          :length="pagesCount"
          circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import AppCard from "./components/AppCard";
import RouteMixin from "../../mixins/Route";
import Request from '../../mixins/Request'

export default {
  name: "AppLayout",
  mixins: [RouteMixin, Request],
  props:{
    loadDefault:{
      required:false,
      default:true
    }
  },
  data() {
    return {
      articles: [],
      pagesCount: 1,
      currentPage: 1,
      isLoading:true
    }
  },
  mounted() {
    if(this.loadDefault)
    {
      // Getting main page articles
      this.request('article')
          .then(
              ({data}) => {
                this.articles = data.data.articles
                this.isLoading=false
              })
          .catch(error => {
            console.log(error)
          })
      // Getting pages count
      this.request('article/count')
          .then(
              ({data}) => {
                this.pagesCount = data.data.count;
              })
          .catch(error => {
            console.log(error)
          })
    }

  },
  /**
   * We need reference to updateContent function to
   * update content from other components such as
   * filter component or user component
   */
  created() {
    this.$root.$refs.updateContent = this.updateContent;
  },
  methods: {
    updateContent(data) {
      this.articles = data
    }
  },
  components: {
    AppCard
  },
}
</script>

<style scoped>

</style>