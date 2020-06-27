<template>
  <div>
    <div class="container">
      <div class="content">
        <h2>Login</h2>
        <input type="text" placeholder="Username" v-model="userName" />
        <input type="password" placeholder="Password" v-model="password" />
        <button @click="loginUser">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import firebaseApp from "../firebase/init";

export default {
  name: "login",
  data() {
    return {
      userName: null,
      password: null
    };
  },
  methods: {
    loginUser() {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.userName, this.password)
        .then(() => {
          this.$emit("logged-in");
          this.userName = "";
          this.password = "";
        });
    }
  }
};
</script>

<style scoped>
.container {
  top: -19px;
  right: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  margin-top: 5em;
  background-color: #333;
  border-bottom-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 3px solid #ffc526;
  border-bottom: 3px solid #ffc526;
  z-index: 1;
}

.container .content {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container h2 {
  color: #ffc526;
  margin: 0;
}
.container input {
  font-family: "Montserrat", sans-serif;
  width: 20em;
  padding: 0.8em;
  margin: 0.5em 0em;
  border-radius: 3px;
  border: 2px solid rgba(165, 165, 165, 0);
}
.container input:focus {
  border: 2px solid #ffc526;
}
.container button {
  margin-top: 0.8em;
  font-family: "Montserrat", sans-serif;
  width: 7em;
  padding: 0.5em;
  border: none;
  color: white;
  background-color: #ffc526;
  font-weight: 700;
  border-radius: 3px;
  cursor: pointer;
}
.container button:hover {
  background-color: #f1bb24;
}
</style>