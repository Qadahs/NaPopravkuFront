<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="40%"
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
import axios from "axios";

export default {
  data () {
    return {
      dialog: false,
      tags:[],
      text:'',
      selectedTags:[],
      errors:[]
    }
  },
  methods:{
    addArticle(){
      if(this.validation())
      {
        let data={
          'id':this.$store.getters.getUser.id,
          'tags':this.selectedTags,
          'text':this.text,
          'Authorization':`Bearer ${this.$store.getters.getToken}`
        }
        axios.post('http://localhost/api/article/add',data).then(()=>{
          this.dialog=false
          this.selectedTags=[]
          this.text=''
          this.errors=[]
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    validation(){
      if(!this.text.trim())
      {
        this.errors.push('Необходимо добавить цитату')
        return false;
      }
      if(this.selectedTags.length<3){
        this.errors.push('Выберите 3 тэга')
        return false;
      }
      return true;
    }
  },
  mounted() {
    axios.get('http://localhost/api/tags')
        .then(({data})=>{
          this.tags=data.data.tags
    }).catch(e=>{
      console.log(e)
    })
  }
}
</script>