<template>
  <div>
    <header>
      <nav>
        <div class="nav-items">
          <div>
            <router-link class="nav-item" to="/home">Home</router-link>
            <a class="nav-item">Article</a>
            <router-link class="nav-item" to="/chat">Chat</router-link>
          </div>
          <h1 class="user-welcome logo">{{"Welcome" + userName}}</h1>
          <div class="login-signup">
            <a class="nav-item sign-up" @click="signUpForm()">Sign up</a>
            <a v-if="!userLoggedIn" @click="loginForm()" class="nav-item login">Login</a>
            <a v-if="userLoggedIn" @click="logoutForm()" class="nav-item login">Logout</a>
          </div>
        </div>
        <signUp @signed-up="signUpStatus = false" v-if="signUpStatus" />
        <login
          @logged-in="userLoggedIn = true, loginStatus = false;"
          v-if="loginStatus"
          @user-name="updateName"
        />
      </nav>
    </header>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebaseApp from "../firebase/init";
import login from "./login.vue";
import signUp from "./signUp.vue";
export default {
  name: "vueHeader",
  components: {
    login,
    signUp
  },
  data() {
    return {
      loginStatus: false,
      signUpStatus: false,
      userLoggedIn: false,
      userName: ""
    };
  },
  methods: {
    loginForm() {
      this.loginStatus = !this.loginStatus;
      this.signUpStatus = false;
    },
    updateName(name) {
      this.userName = ", " + name;
    },
    signUpForm() {
      this.signUpStatus = !this.signUpStatus;
      this.loginStatus = false;
    },
    logoutForm() {
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          this.userLoggedIn = false;
          this.updateAdmin(false);
        });
    },
    ...mapActions(["updateAdmin"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
nav {
  width: 100vw;
  background-color: #333;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1);
}
.nav-items {
  text-transform: uppercase;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin: 0;
  color: white;
  display: inline-block;
  font-size: 2.5em;
}
.nav-item {
  height: 100%;
  display: inline-block;
  padding: 1.3em;
  list-style: none;
  cursor: pointer;
}
.nav-item {
  text-decoration: none;
  color: #ffc526;
  font-weight: 500;
  transition: 0.1s ease-in-out;
}
.nav-item:hover {
  background-color: rgb(63, 63, 63);
}
.login-signup {
  display: inline-flex;
  margin-right: 2.2em;
}
.login,
.sign-up {
  margin: 0 0.5em;
  border-radius: 3px;
  padding: 0.5em;
  border: 1px solid white;
}

button::-moz-focus-inner {
  border: 0;
}
a:focus {
  outline: none;
}
</style>
