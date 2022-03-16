<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <a>username</a>
      <input type="text" v-model="username" />
    </div>
    <div>
      <a>email</a>
      <input type="text" v-model="email" />
    </div>
    <div>
      <a>password</a>
      <input type="text" v-model="password" />
    </div>
    <button v-on:click="signUp">SIGNUP</button>
    {{ username }}
    {{ email }}
    {{ password }}
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

const auth = getAuth()

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    }
  },
  methods: {
    async signUp() {
      //FireBaseのAuthenticationに登録
      await createUserWithEmailAndPassword(auth, this.email, this.password)

      //FireBaseのAuthenticationの登録時にAuthenticationに割り当てられたUIDを取得
      const user = auth.currentUser
      const uid = user.uid

      //FireBaseのDBに保存する内容のまとめ
      const signUpInfo = {
        username: this.username,
        email: this.email,
        isGeekSalon: false,
      }

      //FireBaseのDBに保存
      const cityRef = doc(db, "users", uid)
      setDoc(cityRef, signUpInfo)
    },
    login() {
      signInWithEmailAndPassword(auth, this.username, this.password)
    },
  },
}
</script>
