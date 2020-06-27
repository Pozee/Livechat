import Vue from 'vue'
import VueChatScroll from "vue-chat-scroll";
import App from './App.vue'
import router from './router'
import store from '../store/index'

Vue.config.productionTip = false
Vue.use(VueChatScroll);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
