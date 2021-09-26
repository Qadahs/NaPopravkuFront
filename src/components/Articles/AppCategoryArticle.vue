<template>
<div>
  <v-select
      v-model="selectedTags"
      :items="tags"
      chips
      label="Теги"
      multiple
      @input="updateContent"
  ></v-select>
  <h1>navigation</h1>
  <app-article-list :loadDefault="false"></app-article-list>
</div>
</template>

<script>
import AppArticleList from "../Articles/AppArticleList";
import Request from '../../mixins/Request';
export default {
  name: "AppCategoryArticle",
  mixins: [Request],
  data(){
    return {
      tags: [],
      selectedTags: [],
    }
  },
  methods:{
    updateContent(){
      this.$root.$refs.loadPage()
      console.log("here");
    }
  },
  created() {
    if(this.$route.params.tag)
    {
      this.selectedTags.push(this.$route.params.tag)
    }
    this.$root.$refs.loadContent = function (page){
      const body = {
        filters:{
          tags: this.selectedTags,
        },
        page:page
      }
      console.log(JSON.stringify(body))
      return this.request('article/filter', 'POST', body)
    }.bind(this)
  },
  components:{
    AppArticleList
  },
  mounted() {

    this.request('tags')
        .then(
            ({data}) => {
              console.log("TAGS")
              console.log(data)
              this.tags=data.data.tags;
            })
        .catch(error => {
          console.log(error)
        })
  }
}
</script>

<style scoped>

</style>