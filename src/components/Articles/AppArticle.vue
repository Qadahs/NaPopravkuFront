<template>
<div><h1>{{ this.article.article.text }}</h1></div>
</template>

<script>

export default {
  name: "AppArticle",
  data(){
    return {
      article:this.$route.params.article
    }
  },
  mounted() {
    console.log(this.article)
  }
}
</script>

<style scoped>

</style>