<template>
  <v-app>
    <v-card
        class="mx-auto overflow-hidden rounded-0"
        width="100%"
        height="100%"
    >
      <v-app-bar
          color="deep-purple"
          dark
          width="100%"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Цитатник</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn
            class="ma-16 float-right"
            small
            color="indigo"
        >
          <v-icon>mdi-pencil</v-icon>
          Добавить цитату

        </v-btn>

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
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
                <v-list-item-title @click="routeToAccount">Аккаунт</v-list-item-title>
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
import RouteMixin from "./mixins/RouteMixin";
export default {
  mixins:[RouteMixin],
  data: () => ({
    drawer: false,
    group: null,
    isAuth:false,
  }),
  methods:{
    routeToAccount(){
      if(!this.isAuth){
       this.navigate('/login')
      }
    }
  }
}
</script>