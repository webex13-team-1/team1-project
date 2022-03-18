<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/new">New</router-link> |
    <router-link to="/search">Search</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <div>
    <button v-on:click="identifyLoginStatus">STATUS</button>
    {{ loginStatus }}
    {{ loginUid }}
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
//SIGNUP関連
import { getAuth } from "firebase/auth"

//ログインSTATUS関連
import { onAuthStateChanged } from "firebase/auth"

import { db } from "./firebase"

const auth = getAuth()

db

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loginStatus: "",
      loginUid: "",
      loginUsername: "",
      loginEmail: "",
    }
  },
  methods: {
    identifyLoginStatus() {
      onAuthStateChanged(auth, (user) => {
        console.log("------A")
        if (user) {
          this.loginStatus = "Logined"
          this.loginUid = user.uid
        } else {
          this.loginStatus = "Logout"
          this.loginUid = "-UID-"
        }
      })
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log("------B")
      if (user) {
        this.loginStatus = "Logined"
        this.loginUid = user.uid
      } else {
        this.loginStatus = "Logout"
        this.loginUid = "-UID-"
      }
    })
    //ここの関数はmethodsの関数と同じなので、まとめれば！
  },
}
</script>
