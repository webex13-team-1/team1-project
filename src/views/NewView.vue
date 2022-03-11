<template>
  <div class="app">
    <textarea v-model="title" placeholder="タイトルを記入する場所" />
    <br />
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="ガクチカを記入する場所"
    />
    <br />
    <button v-on:click="postTweet">投稿</button>
    <!-- 変更点１ -->
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.title }}
        {{ tweet.text }}
      </p>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  /* 変更点２ */
  data() {
    return {
      tweets: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      ],
    }
  },
  methods: {
    postTweet() {
      /* 変更点１ */
      const tweet = {
        text: this.text,
        title: this.title,
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
}
</script>
