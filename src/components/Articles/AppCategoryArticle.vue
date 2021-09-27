<template>
<div>
  <v-container class="justify-center" style="max-width: 800px">
    <v-select
        v-model="selectedTags"
        :items="tags"
        chips
        label="Теги"
        multiple
        @input="updateContent"
    ></v-select>
  </v-container>

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
    },
    injectTag(tag)
    {
      if(!this.selectedTags.includes(tag))
      {
        this.selectedTags.push(tag)
        this.updateContent()
      }

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
      return this.request('article/filter', 'POST', body)
    }.bind(this)
  },
  components:{
    AppArticleList
  },
  mounted() {
    this.$root.$refs.injectTag = this.injectTag
    this.request('tags')
        .then(
            ({data}) => {
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