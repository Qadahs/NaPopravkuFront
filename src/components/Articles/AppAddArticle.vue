<template>

  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        max-width="40%"
        no-click-animation

    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            class="ma-5"
        >
          <v-icon>mdi-pencil</v-icon>
          Добавить цитату
        </v-btn>
      </template>
      <v-card>
        <v-alert v-for="error in errors" type="warning" :key="error">{{ error }}</v-alert>
        <v-card-title class="text-h5">
          Добавить новую цитату
        </v-card-title>
        <v-container>
          <v-form class="ma-auto width">
            <v-textarea
                v-model="text"
            ></v-textarea>
          </v-form>
          <v-select
              v-model="selectedTags"
              :items="tags"
              chips
              label="Теги"
              multiple
          ></v-select>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="addArticle"
          >
            Добавить
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

</template>

<script>
import Request from "../../mixins/Request";
import Route from "../../mixins/Route";

export default {
  mixins: [Route, Request],
  data() {
    return {
      dialog: false,
      tags: [],
      text: '',
      selectedTags: [],
      errors: []
    }
  },
  methods: {
    addArticle() {
      this.$emit('updatePageContent')
      if (this.validation()) {
        let data = {
          'id': this.$store.getters.getUser.id,
          'tags': this.selectedTags,
          'text': this.text,
        }
        this.authRequest('article/add', 'POST', data)
            .then(
                () => {
                  this.dialog = false
                  this.selectedTags = []
                  this.text = ''
                  this.errors = []
                  this.$root.$refs.loadPage()
                }).catch(({response}) => {
          this.errors = this.parseErrors(response)
        })
      }
    },
    validation() {
      if (!this.text.trim()) {
        this.errors = ['Необходимо добавить цитату']
        return false;
      }
      if (this.selectedTags.length < 3) {
        this.errors = ['Выберите 3 тэга']
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.request('tags')
        .then(
            ({data}) => {
              this.tags=data.data.tags;
            })
        .catch(({response}) => {
          this.errors = this.parseErrors(response)
        })
  }
}
</script>