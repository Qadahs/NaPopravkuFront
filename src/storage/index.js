import Vuex from 'vuex';
import Vue from "vue";
import createPersistedState  from 'vuex-persistedstate';
Vue.use(Vuex);
export default new Vuex.Store({
    plugins:[createPersistedState({
        storage:window.sessionStorage,
    })],
    state:{
        isAuth:false,
        token:'',
        user:null
    },
    mutations: {
        setUser(state,user){
            state.isAuth=true
            state.token=user.token
            state.user=user.user
        },
        logout(){
            this.state.isAuth=false
            this.state.token=''
            this.state.user=null
        }
    },
    getters:{
        getToken(state){
            return state.token
        },
        getAuth(state){
            return state.isAuth
        },
        getUser(state){
            return state.user
        }
    }
})