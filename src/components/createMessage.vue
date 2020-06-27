<template>
  <div style="border-top: 1px solid black; margin-top:0.5em;" @keyup.enter="createMessage">
    <div class="container">
      <form @submit.prevent="createMessage">
        <div class="form-group">
          <input
            autocomplete="off"
            type="text"
            name="message"
            class="form-control"
            placeholder="Enter message ..."
            ref="msg"
            v-model="newMessage"
          />
        </div>
        <button type="submit" name="action">Submit</button>
        <div class="emojis" v-for="emoji in emojis" :key="emoji.index">
          <span @click="addEmoji(emoji)">{{ emoji }}</span>
        </div>
        <div>
          <span>{{selectedEmoji}}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import fb from "@/firebase/init";

export default {
  name: "createMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      selectedEmoji: null,
      emojis: ["😀", "😄", "😁", "😉", "🥰", "🤑"],
      isAdmin: false
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        if (this.capitalize === "Admin") {
          this.isAdmin = true;
        }
        this.userRoll();
        fb.firestore()
          .collection("messages")
          .add({
            message: this.newMessage,
            name: this.capitalize,
            isAdmin: this.isAdmin,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A message must be entered first!";
      }
    },
    focusInput() {
      this.$refs.msg.focus();
    },
    addEmoji(emoji) {
      if (this.newMessage === null) {
        this.newMessage = emoji;
      } else this.newMessage = this.newMessage + emoji;
    },
    userRoll() {
      let math = Math.floor(Math.random() * 100) + 1;
      if (this.newMessage == "/Roll" || this.newMessage == "/roll") {
        this.newMessage = "You rolled: " + math;
      }
    }
  },
  mounted() {
    this.focusInput();
  },
  computed: {
    capitalize() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
  }
};
</script>

<style  scoped>
.container {
  margin-top: 1em;
}
.form-group input {
  display: inline-block;
  width: 41.5em;
  margin-bottom: 1em;
  height: 2em;
}
button {
  cursor: pointer;
  border: none;
  color: white;
  background-color: rgb(33, 182, 228);
  padding: 0.6em;
  margin-right: 0.5em;
}
.emojis {
  font-size: 1.2em;
  cursor: pointer;
  display: inline;
}
</style>