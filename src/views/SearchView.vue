<template>
  <div class="search">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>ジャンル検索</p>
    <input type="text" list="samplelist" v-model="inputValue" />
    <!-- <option value="1">選考</option> -->
  </div>
  <div class="lists">
    <div
      class="list"
      v-for="searchCompanies in searchGenre"
      :key="searchCompanies.companyId"
    >
      <div class="list-header">
        <a>Header</a>
      </div>
      <div class="cards">
        <!-- 以下一枚一枚のカード作り -->
        <div class="card">
          <!-- :key="content.id"がないとエラーが出る -->
          <!-- 会社名 -->
          <div class="company-name">
            会社名
            {{ searchCompanies.companyName }}
          </div>
          <div
            class="envents"
            v-for="event in searchCompanies.companyContents.event"
            :key="event.eventId"
          >
            <div class="event">
              <a class="event-title">
                <!-- イベント名 -->
                {{ event.eventTitle }}
              </a>
              <a>/</a>
              <a class="event-category">
                <!-- イベント種類 -->
                {{ event.eventCategory }}
              </a>
            </div>
          </div>
        </div>
        <!-- 以上一枚一枚のカード作り -->
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  data() {
    return {
      inputValue: "",
      companies: [
        {
          companyId: 1,
          companyName: "Apple",
          companyContents: {
            event: [
              {
                eventId: 1,
                eventTitle: "Apple会社夏選考",
                eventCategory: "選考",
                eventContents: [
                  {
                    eventContentCategory: "申し込み",
                    eventContentMemo: [
                      {
                        topic: "ES",
                        wordCount: 400,
                        question: "志望動機はなんですか？",
                        answer: "御社の〇〇〜〜",
                      },
                      {
                        topic: "ES",
                        wordCount: 500,
                        question: "ガクチカはなんですか？",
                        answer: "私のガクチカは〇〇〜〜",
                      },
                    ],
                  },
                ],
              },
              {
                eventId: 2,
                eventTitle: "Apple会社秋選考",
                eventCategory: "選考",
                eventContents: [],
              },
            ],
          },
        },
        {
          companyId: 2,
          companyName: "Microsoft",
          companyContents: {
            event: [
              {
                eventId: 1,
                eventTitle: "Microsoft会社夏選考",
                eventCategory: "選考",
                eventContents: [],
              },
              {
                eventId: 2,
                eventTitle: "Microsoft会社秋選考",
                eventCategory: "選考",
                eventContents: [],
              },
            ],
          },
        },
      ],
    }
  },
  //this.companies[0].companyContents.event[0]
  computed: {
    searchGenre: function () {
      const searchWord = this.inputValue

      var searchCompanies = []
      console.log(searchCompanies)

      for (let i = 0; i < this.companies.length; i++) {
        var pushCompanyInfomation = {}
        pushCompanyInfomation.companyId = this.companies[i].companyId
        pushCompanyInfomation.companyName = this.companies[i].companyName

        var event = []
        for (
          let j = 0;
          j < this.companies[i].companyContents.event.length;
          j++
        ) {
          if (
            searchWord ==
            this.companies[i].companyContents.event[j].eventCategory
          ) {
            event.push(this.companies[i].companyContents.event[j])
          }
        }
        console.log("--------")
        if (event.length != 0) {
          pushCompanyInfomation.companyContents = { event: event }
          searchCompanies.push(pushCompanyInfomation)
        }
      }
      return searchCompanies
    },
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "companies"))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.companies1.push(doc.data())
    })
  },
}
</script>
