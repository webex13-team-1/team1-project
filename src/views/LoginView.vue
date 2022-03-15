<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <a>username</a>
      <input type="text" v-model="username" />
    </div>
    <div>
      <a>password</a>
      <input type="text" v-model="password" />
    </div>
    <button v-on:click="signUp">SIGNUP</button>
    {{ username }}
    {{ password }}
  </div>
</template>

<script>
import { auth, createUser } from "../firebase.js"

export default {
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    signUp() {
      createUser(auth, this.username, this.password)
    },
  },
}
</script>
