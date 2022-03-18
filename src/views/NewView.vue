<template>
  <div class="app">
    <!-- <textarea v-model="title" placeholder="タイトルを記入する場所" />
    <br />
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="ガクチカを記入する場所"
    />
    {{ this.title }}
    {{ this.text }} -->
    <br />
    <textarea v-model="companyName" placeholder="companyName"></textarea>
    <textarea v-model="eventTitle" placeholder="eventTitle"></textarea>
    <textarea v-model="eventCategory" placeholder="eventCategory"></textarea>
    <br />
    {{ companyName }}
    {{ eventTitle }}
    {{ eventCategory }}

    <button v-on:click="postTweet">投稿</button>
    <!-- 変更点１
    <div>
      <p v-for="company in companies" :key="company.id">
        {{ company.title }}
        {{ company.text }}
      </p>
    </div> -->
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase"

export default {
  /* 変更点２ */
  data() {
    return {
      companyName: "",
      eventTitle: "",
      eventCategory: "",
    }
  },
  methods: {
    postTweet() {
      const data = {
        companyId: 1,
        companyName: this.companyName,
        companyContents: {
          event: [
            {
              eventId: 1,
              eventTitle: this.eventTitle,
              eventCategory: this.eventCategory,
            },
          ],
        },
      }
      console.log(data)
      addDoc(collection(db, "companies"), data)
    },
  },
  // created() {
  //   getDocs(collection(db, "companies")).then((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       this.companies.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       })
  //     })
  //   })
  // },
}
</script>
