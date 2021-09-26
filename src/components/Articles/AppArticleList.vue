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
    <div class="text-center">
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
    }
  },
  mounted() {
    if (this.loadDefault) {
      this.loadPage()
      console.log("deff")
      console.log(this.loadContent)
      // Getting main page articles
      // this.request(`article`)
      //     .then(
      //         ({data}) => {
      //           this.articles = data.data.articles
      //           this.pagesCount=data.data.pagesCount
      //           this.isLoading=false
      //         })
      //     .catch(error => {
      //       console.log(error)
      //     })
    } else {
      this.loadContent = this.$root.$refs.loadContent
      console.log("not deff")
      console.log(this.$root.$refs.loadContent)
      this.loadPage()
    }
  },
  /**
   * We need reference to updateContent function to
   * update content from other components such as
   * filter component or user component
   */
  created() {
    if (!this.$root.$refs.loadContent) {
      this.$root.$refs.loadContent = this.loadContent;
    }
    this.$root.$refs.loadPage = this.loadPage;

  },
  computed: {},
  methods: {
    getCurrentPage() {
      if (this.$route.params.page) return this.$route.params.page
      return 1
    },
    loadContent(page) {
      // this.isLoading=true
      return this.request(`article?page=${page}`)
    },
    loadPage() {
      this.isLoading = true
      let content = this.loadContent(this.currentPage)
      content.then(({data}) => {
        console.log(data)
        this.articles = data.data.articles
        this.pagesCount = data.data.pagesCount
        this.isLoading = false
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