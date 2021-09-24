<template>
  <v-card
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="90%"
  >
    <v-card-text class="text-h5 font-weight-bold">
      "{{article.article.text}}"
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title>Автор: {{article.user.login}}</v-list-item-title>
          <v-list-item-title>Дата: {{article.article.created_at}}</v-list-item-title>
          <p>Tags</p>
          <ul>
            <li v-for="tag in article.article.tags" :key="tag">{{tag.title}}</li>
          </ul>
        </v-list-item-content>
      </v-list-item>

    </v-card-actions>
  </v-card>
</template>

<script>


export default {
  props:['article'],
  data: () => ({
    //
  }),
  mounted() {
  },
  methods:{
  }
}
</script>