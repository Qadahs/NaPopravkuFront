<template>
  <v-container>
 <v-form class="ma-auto width">
   <v-text-field
   label="Login"
   ></v-text-field>
   <v-text-field
       label="Password"
   ></v-text-field>
   <v-text-field
       label="Repeat Password"
   ></v-text-field>
  <v-btn>Register</v-btn>

 </v-form>
  <router-link to="/register">register</router-link>
  </v-container>
</template>

<script>


export default {
}
</script>
