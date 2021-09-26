<template>
  <v-card
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="90%"
      min-width="250px"
      @click="routeToArticle"
  >


    <v-card-text class="text-h5 font-weight-bold">
      {{article.article.text}}
    </v-card-text>

    <v-card-actions @click.stop="routeToUser">
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-avatar
              color="primary"
              size="58"
          >{{loginFirstLatter}}</v-avatar>
        </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{article.user.login}}</v-list-item-title>
          </v-list-item-content>

      </v-list-item>
    </v-card-actions>

    <v-card-actions>
      <v-row
          align="center"
          justify="start"
          class="ms-2"
      >
        <v-chip
            v-for="tag in article.article.tags"
            :key="tag.id"
            class="ma-2"
            @click.stop="routeToSearch(tag.id)"
        >
          {{ tag.title }}
        </v-chip>
      </v-row>
    </v-card-actions>
    <v-card-actions class="ms-4">
      <v-list-item-content>
        <v-list-item-title>{{article.article.created_at}}</v-list-item-title>
      </v-list-item-content>
    </v-card-actions>
  </v-card>
</template>

<script>
import Route from "../../../mixins/Route"

export default {
  mixins:[Route],
  props:['article'],
  methods:{
    routeToArticle(){
      this.$router.push({name:'Article',params:{slug:"test",article:this.article}})
    },
    routeToUser(){
      this.$router.push({name:'User',params:{login:this.article.user.login,user:this.article.user}})
    },
    routeToSearch(tag){
      this.$router.push({name:'Search',params:{tag:tag}})
    }
  },
  computed:{
    loginFirstLatter()
    {
      return this.article.user.login.charAt(0).toUpperCase()
    }
  }
}
</script>