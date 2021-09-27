<template>
  <v-container v-if="isLoading" fill-height fluid style="width: 150px">
    <v-progress-circular
        :size="150"
        color="primary"
        indeterminate
    ></v-progress-circular>
  </v-container>
  <div v-else>
    <v-container class="grey lighten-5 justify-center" style="max-width: 800px;">
      <h1 v-if="noContent" class="d-flex justify-center">Цитат не найдено</h1>
      <v-row no-gutters justify="space-around">
        <template
            v-for="(article,idx) in articles">
          <v-col offset="0" :key="article.id">
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
    <div class="text-center" v-if="!noContent">
      <v-pagination
          @input="loadPage"
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
  props: {
    loadDefault: {
      required: false,
      default: true,
    }
  },
  data() {
    return {
      articles: [],
      pagesCount: 1,
      currentPage: 1,
      isLoading: true,
      noContent:false,
    }
  },
  mounted() {
    if (this.loadDefault) {
      this.loadPage()
    } else {
      this.loadContent = this.$root.$refs.loadContent
      this.loadPage()
    }
  },
  created() {
    if (!this.$root.$refs.loadContent) {
      this.$root.$refs.loadContent = this.loadContent;
    }
    this.$root.$refs.loadPage = this.loadPage;

  },
  computed: {},
  methods: {
    loadContent(page) {
      return this.request(`article?page=${page}`)
    },
    loadPage() {
      this.isLoading = true
      let content = this.loadContent(this.currentPage)
      content.then(({data}) => {
        this.articles = data.data.articles
        this.pagesCount = data.data.pagesCount
        this.isLoading = false
        this.noContent=false;
      }).catch(()=>{
        this.articles=[]
        this.isLoading = false
        this.noContent=true
      })
    }
  },
  components: {
    AppCard
  },
}
</script>

<style scoped>

</style>