<template>
  <div>
    <div class="adm-panel">
      <h5>Make admin</h5>
      <input v-model="adminEmail" type="text" />
      <button @click="makeAdmin">Add admin</button>
    </div>
    <div class="container" v-if="!loggedIn">
      <div class="content">
        <h2>Chat login</h2>
        <input
          type="text"
          placeholder="Please enter your name..."
          v-model="userName"
          @keyup.enter="enterPress(userName)"
        />
        <button @click="sendUserName(userName), login(), getMessages()">Enter Chat</button>
      </div>
    </div>
    <div class="container" v-if="loggedIn">
      <div class="content chat-window">
        <div class="messages" v-chat-scroll="{always: false, smooth: true}">
          <div class="message" v-for="(message) in messages" :key="message.id">
            <div>
              <span :class="{'admin' : message.isAdmin}" class="text-info">
                [{{ message.name }}]:
                <span
                  @click="deleteMsg(message)"
                  class="delete-btn"
                  v-if="checkAdmin"
                >❌</span>
              </span>
              <span>{{message.message}}</span>
            </div>
            <span class="text-secondary time">{{message.timestamp}}</span>
          </div>
        </div>
        <createMessage :name="name" class="create-msg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import createMessage from "./createMessage";
import fb from "../firebase/init.js";
import moment from "moment";
import firebaseApp from "../firebase/init.js";
moment.locale("sv");
const functions = firebaseApp.functions();

export default {
  name: "chat",
  components: {
    createMessage
  },
  data() {
    return {
      userName: "",
      messages: [],
      loggedIn: false,
      adminEmail: "",
      isAdmin: false
    };
  },
  methods: {
    enterPress(userName) {
      this.sendUserName(userName);
      this.getMessages();
      this.login();
    },
    sendUserName(name) {
      if (name.length) {
        this.$emit("user-name", name);
        this.name = name;
      } else return;
    },
    login() {
      if (this.userName) {
        this.loggedIn = true;
      }
    },
    getMessages() {
      if (this.userName.length) {
        let ref = fb
          .firestore()
          .collection("messages")
          .orderBy("timestamp");
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == "added") {
              let doc = change.doc;
              this.messages.push({
                id: doc.id,
                name: doc.data().name,
                message: doc.data().message,
                isAdmin: doc.data().isAdmin,
                timestamp: moment(doc.data().timestamp).format("LTS")
              });
            }
          });
        });
      }
    },
    makeAdmin() {
      const adminFunc = functions.httpsCallable("addAdminRole");
      adminFunc({ email: this.adminEmail }).then(result => {
        console.log(result);
      });
    },
    deleteMsg(msg) {
      let filter = this.messages.filter(message => {
        msg.id !== message.id;
      });
      console.log(filter);

      fb.firestore()
        .collection("messages")
        .doc(msg.id)
        .delete();
      console.log(msg.id);
    }
  },
  computed: mapGetters(["checkAdmin"])
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap");
.adm-panel {
  display: none;
}
.container {
  display: flex;
  justify-content: center;
  margin-top: 5em;
}

.container .content {
  border-radius: 5px;
  border: 1px solid rgb(165, 165, 165);
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container h2 {
  padding-bottom: 0.5em;
  margin: 0;
  text-align: center;
}
.container input {
  font-family: "Montserrat", sans-serif;
  width: 20em;
  padding: 0.8em;
  border-radius: 3px;
  border: 1px solid rgb(165, 165, 165);
}
.container input:focus {
  border: 1px solid #ffc526;
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

.chat-window {
  height: 25em;
  width: 35em;
}
.messages {
  opacity: 0.8;
  height: 25em;
  max-height: 45em;
  width: 35em;
  overflow: scroll;
  overflow-x: hidden;
}
.message:nth-child(even) {
  background-color: rgb(245, 245, 245);
}
.message {
  position: relative;
  padding-top: 0.5em;
}
.text-info {
  margin-right: 0.5em;
  color: rgb(11, 206, 141);
}
.text-secondary {
  font-size: 0.7em;
  opacity: 0.6;
}
.admin {
  color: red;
}
.content {
  resize: vertical;
  overflow: auto;
}
.delete-btn {
  position: absolute;
  right: 0;
  cursor: pointer;
}
</style>