



<template>
<div id="app">
  <div id="nav">
    <VueHeader />
  </div>
  <body>
    <router-view />
  </body>
</div>
</template>

<script>
import firebaseApp from "./firebase/init";
import VueHeader from "./components/VueHeader.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  components: {
    VueHeader
  },
  methods: {
    ...mapActions(["updateAdmin"])
  },
  computed: mapGetters(["checkAdmin"]),
  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(getIdTokenResult => {
          if (getIdTokenResult.claims.admin) {
            this.updateAdmin(true);
          } else this.updateAdmin(false);
        });
      }
    });
  }
};
</script>

<style>
body,
html {
  font-family: "montserrat", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#nav a.router-link-exact-active {
  background-color: rgb(63, 63, 63);
  color: #fff;
}
</style>
