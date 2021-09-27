<template>
  <v-container v-if="loaded">

    <v-container class="justify-center" style="max-width: 800px">
      <div class="d-sm-flex justify-space-between">
        <h1>{{ user.login }}</h1>
        <v-spacer></v-spacer>
        <v-btn v-if="$store.getters.getAuth && user.id!=$store.getters.getUser.id"  @click="subscribeAction">{{subscribeText}}</v-btn>
      </div>
      <h3 class="mt-5">Цитаты пользователя:</h3>
    </v-container>

    <app-article-list :loadDefault="false"></app-article-list>

  </v-container>
</template>

<script>
import AppArticleList from "../Articles/AppArticleList";
import Request from '../../mixins/Request';

export default {
  name: "AppUser",
  mixins: [Request],
  data() {
    return {
      user: undefined,
      loaded:false,
      subscribeLoaded:false,
      subscribeText:''
    }
  },
  methods:{
    subscribeAction()
    {
      if(this.subscribeText==='Подписаться')
      {
        let data = {
          id:this.user.id,
        }
        this.authRequest('follow','POST',data)
            .then(
                ()=>{
                  this.subscribeText='Отписаться'
                })
            .catch(()=>{})
      }
      else
      {
        this.authRequest(`unfollow?id=${this.user.id}`,'DELETE')
            .then(
                ()=>{
                  this.subscribeText='Подписаться'
                })
            .catch(()=>{})
      }
    },
    checkSubscribe()
    {
      this.authRequest(`follow/check?id=${this.user.id}`)
          .then(
              ({data})=>{
                this.subscribeLoaded=true
                if(data.data.subscriber)
                {
                  this.subscribeText='Отписаться'
                }
                else
                {
                  this.subscribeText='Подписаться'
                }
              }).catch(()=>{})
    },
    getUser()
    {
      if(this.$route.params.user)
      {
        this.user= this.$route.params.user
        this.loaded=true
        this.checkSubscribe()
      }
      else {
        let data = {
          "login":this.$route.params.login
        }
        this.authRequest('public/account','POST',data)
            .then(
                ({data})=>{
                  this.user=data.data.user;
                  this.loaded=true
                  this.checkSubscribe()
                })
        .catch(()=>{})
      }
    }
  },
  created() {
    this.getUser();
    this.$root.$refs.loadContent = function (page){
      const body = {
        filters:{
          user: this.user.id,
        },
        page:page
      }
      return this.request('article/filter', 'POST', body)
    }.bind(this)
  },

  components: {
    AppArticleList
  }
}
</script>

<style scoped>

</style>