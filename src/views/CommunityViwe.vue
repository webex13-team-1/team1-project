<template>
  <div class="community">
    <h1>This is an community page</h1>
    <div>
      <button v-on:click="identifyLoginStatus">STATUS</button>
      {{ loginStatus }}
      {{ loginUid }}
    </div>
    <!-- 自分の投稿が1番上に来るようにする -->
    <!-- tweetの情報を取得してきて、 表示-->
    <!-- どのユーザーからの投稿か判別できるようにする -->

    <div class="app">
      <label for="trigger" class="open_btn">✏︎</label>
      <div class="popup_wrap">
        <input id="trigger" type="checkbox" />
        <div class="popup_overlay">
          <label for="trigger" class="popup_trigger"></label>
          <div class="popup_content">
            <label for="trigger" class="close_btn">×</label>
            <p>
              <textarea v-model="title" placeholder="ツイートのタイトル" />
              <br />
              <textarea
                class="form__textarea"
                v-model="text"
                placeholder="本文
        "
              />
              <br />

              <button v-on:click="postTweet">ツイート</button>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div v-for="tweet in tweets" :key="tweet.id" class="tweet">
          <div class="uid">{{ tweet.userId }}</div>
          <div class="title">{{ tweet.title }}</div>
          <div class="text">{{ tweet.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { getAuth } from "firebase/auth"

const auth = getAuth()
const user = auth.currentUser

export default {
  data() {
    return {
      userId: "",
      title: "",
      text: "",
      tweets: [
        // こんな感じのデータが入る予定
        //{
        //  id: "0GwoGZuhTNhqHQDBeiVW",
        //  text: "こんにちは、ツイートの本文です。",
        //},
      ],
    }
  },
  methods: {
    postTweet() {
      const tweet = {
        userId: user.uid,
        title: this.title,
        text: this.text,
      }
      addDoc(collection(db, "tweets"), tweet).then((ref) => {
        this.tweets.push({
          id: ref.id,
          ...tweet,
        })
      })
    },
  },
  created() {
    getDocs(collection(db, "tweets")).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.tweets.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      console.log("------B")
      if (user) {
        this.loginStatus = "Logined"
        this.loginUid = user.uid
        this.user = auth.currentUser
      } else {
        this.loginStatus = "Logout"
        this.loginUid = "-UID-"
      }
    })
    //ここの関数はmethodsの関数と同じなので、まとめれば！
  },
}
</script>

<style>
.tweet {
  border: 0.5px solid;
  border-color: #dddddd;
  width: 60%;
  margin: 0 auto;
}
.uid {
  font-weight: bold;
}
.title {
}
.text {
}

.popup_wrap input {
  display: none;
}
.popup_overlay {
  display: flex;
  justify-content: center;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: #37beb03d;
  opacity: 0;
  transition: opacity 0.5s, transform 0s 0.5s;
  transform: scale(0);
}
.popup_trigger {
  position: absolute;
  width: 100%;
  height: 100%;
}
.popup_content {
  position: relative;
  align-self: center;
  width: 75%;
  max-width: 800px;
  box-sizing: border-box;
  background: #fff;
  line-height: 1.4em;
  transition: 0.5s;
  border-radius: 5%;
  box-shadow: 0 0 5px rgba(94, 94, 94, 0.7);
}
.popup_content p {
  padding: 20px 20px 5px 20px;
  text-align: center;
}
.close_btn {
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 30px;
  cursor: pointer;
  color: #37beb0;
}
.popup_wrap input:checked ~ .popup_overlay {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.5s;
}
.open_btn {
  color: #37beb0;
  border-radius: 50%;
  width: 20px;
  height: 35px;
  cursor: pointer;
  transition: 0.3s ease;
  border: 1px solid #37beb0;
  padding: 5px 15px;
  font-weight: bold;
  position: absolute;
  bottom: 3%;
  right: 5%;
}
.open_btn:hover {
  background: #37beb0;
  color: #fff;
  transition: 0.3s ease;
}
</style>
