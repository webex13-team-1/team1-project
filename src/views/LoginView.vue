<template>
  <div class="sign-up">
    <p>新規登録</p>
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
  </div>
  <div class="login">
    <p>ログイン</p>
    <div>
      <a>email</a>
      <input type="text" v-model="email" />
    </div>
    <div>
      <a>password</a>
      <input type="text" v-model="password" />
    </div>
    <button v-on:click="signUp">LOGIN</button>
  </div>
  <div class="logout">
    <p>ログアウト</p>
    <button v-on:click="signUp">LOGOUT</button>
  </div>
  <div>
    <button v-on:click="identifyLoginStatus">STATUS</button>
    {{ loginStatus }}
    {{ loginUid }}
  </div>
</template>

<script>
//SIGNUP関連
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../firebase"

//ログインSTATUS関連
import { onAuthStateChanged } from "firebase/auth"

const auth = getAuth()

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
    async signUp() {
      //FireBaseのAuthenticationに登録
      await createUserWithEmailAndPassword(auth, this.email, this.password)

      //FireBaseのAuthenticationの登録時にAuthenticationに割り当てられたUIDを取得
      const user = auth.currentUser
      const uid = user.uid
      const creationDate = user.metadata.creationTime

      //FireBaseのDBに保存する内容のまとめ
      const signUpInfo = {
        username: this.username,
        email: this.email,
        isGeekSalon: false,
        createDate: Timestamp.fromDate(new Date(creationDate)),
        loginDate: [Timestamp.fromDate(new Date(creationDate))],
        logoutDate: [],
      }

      console.log(signUpInfo)

      //FireBaseのDBに保存(ドキュメント名=UID)
      const cityRef = doc(db, "users", uid)
      setDoc(cityRef, signUpInfo)
    },
    login() {
      signInWithEmailAndPassword(auth, this.username, this.password)
    },
    identifyLoginStatus() {
      onAuthStateChanged(auth, (user) => {
        console.log("------")
        if (user) {
          // const uid = user.uid
          console.log("login")
          this.loginstatus = "Logined"
          // ...
        } else {
          console.log("logout")
          this.loginstatus = "Logout"
        }
      })
      return this.loginstatus
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      console.log("------")
      if (user) {
        // const uid = user.uid
        console.log("login")
        this.loginStatus = "Logined"
        this.loginUid = user.uid
        // ...
      } else {
        console.log("logout")
        this.loginstatus = "Logout"
      }
    })
    //ここの関数はmethodsの関数と同じなので、まとめれば！
  },
}

//関数
</script>
