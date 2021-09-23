import Vuex from 'vuex';
import Vue from "vue";
import createPersistedState  from 'vuex-persistedstate';
Vue.use(Vuex);
export default new Vuex.Store({
    plugins:[createPersistedState({
        storage:window.sessionStorage,
    })],
    state:{
    },
    mutations: {
    }
})