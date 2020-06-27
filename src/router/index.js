import Vue from 'vue'
import VueRouter from 'vue-router'
import chat from "../components/chat.vue"
import home from "../components/home.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: chat
  },
  {
    path: "/",
    name: "Home",
    component: home
  },
  {
    path: "/home",
    name: "home",
    component: home
  }


]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
