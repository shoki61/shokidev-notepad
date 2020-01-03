import Vue from "vue";
import VueRouter from "vue-router";
import Notes from "./components/Notes";
import Budget from "./components/Budget";
import Home from "./components/Home";
import Note from "./components/Note";
import newNote from "./components/newNote";
import Auth from "./components/Auth";
import {store} from "./store"


Vue.use(VueRouter);

export const router = new VueRouter({
  routes : [
      {
          path: "/", component: Home,
          beforeEnter(to, from, next) {
              setTimeout(()=>{
                  if (store.getters.isAuth) {
                      next()
                  }else {
                      next("/auth")
                  }
              },0)
          }
      },
      {path:"/notes", component:Notes,
          beforeEnter(to, from, next) {
              setTimeout(()=>{
                  if (store.getters.isAuth) {
                      next()
                  }else {
                      next("/auth")
                  }
              },0)
          }
      },
      {path:"/budget", component:Budget,
          beforeEnter(to, from, next) {
              setTimeout(()=>{
                  if (store.getters.isAuth) {
                      next()
                  }else {
                      next("/auth")
                  }
              },0)
          }
      },
      {path:"/note", component:Note,
          beforeEnter(to, from, next) {
              setTimeout(()=>{
                  if (store.getters.isAuth) {
                      next()
                  }else {
                      next("/auth")
                  }
              },0)
          }
      },
      {path:"/newnode", component:newNote,
          beforeEnter(to, from, next) {
              setTimeout(()=>{
                  if (store.getters.isAuth) {
                      next()
                  }else {
                      next("/auth")
                  }
              },0)
          }
      },
      {path:"/auth", component:Auth,
          beforeEnter(to, from, next) {
              if(store.state.token === ""){
                  next()
              }
          }
      }

  ]
});
