<template>
  <v-app>

    <v-card
        class="mx-auto overflow-hidden rounded-0"
        width="100%"
        height="100%"
    >
      <v-app-bar
          color="blue"
          dark
          width="100%"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Цитатник</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="$store.getters.getAuth">
        <app-add-article :updatePageContent='updatePageContent' :dialog="dialog"></app-add-article>
        </div>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>

                <v-list-item-title @click="navigate('/')">Главная страница</v-list-item-title>

            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-filter-variant </v-icon>
              </v-list-item-icon>

              <v-list-item-title @click="navigate('/')">Лента</v-list-item-title>

            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
                <v-list-item-title @click="routeToAccount">{{ this.$root.auth()?'Выйти':'Авторизоваться' }}</v-list-item-title>

            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
        <!--Router-->
      <router-view></router-view>
    </v-card>
 </v-app>
</template>

<script>
import RouteMixin from "./mixins/Route";
import AppAddArticle from "./components/Articles/AppAddArticle";
export default {
  mixins:[RouteMixin],
  data: () => ({
    drawer: false,
    group: null,
    dialog:false,
  }),
  mounted() {

  },
  methods:{
    routeToAccount(){
      if(!this.$root.auth()){
       this.navigate('/login')
      }
      if(this.$root.auth()){
        this.$store.commit('logout')
      }
    },
    showDialog(){
      this.dialog=true;
    },
    updatePageContent(){
      console.log('updatePageContent')
    }
  },
  components:{
    AppAddArticle,
  }
}
</script>