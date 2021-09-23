<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <template v-for="n in 4">
          <v-col :key="n">
            <app-card class="mb-3"></app-card>
          </v-col>
          <v-responsive
              v-if="n === 2"
              :key="`width-${n}`"
              width="100%"
          ></v-responsive>
        </template>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination

          :length="4"
          circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import AppCard from "./components/AppCard";
export default {
  name: "AppLayout",
  components:{
    AppCard
  }
}
</script>

<style scoped>

</style>