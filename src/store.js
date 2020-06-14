import Vue from "vue"
import Vuex from "vuex"
import {router} from "./router"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token : ""
    },
    mutations: {
        setToken(state,token){
            state.token = token
        },
        clearToken(state){
            localStorage.clear();
            state.token = ""
        },
    },
    actions : {
        initAuth({commit}){
            let token = localStorage.getItem("token");
            if(token) {
                commit("setToken", token);
            }else{
                router.push("/auth")
            }
        }
    },
    getters : {
        isAuth(state){
             return   state.token !== ""
        }
    },
});
