<template>
  <div class="home">
    <div class="header">
      <p>新規投稿</p>
    </div>
    <div class="lists">
      <div class="list" v-for="company in companies" :key="company.companyId">
        <div class="list-header">
          <a>Header</a>
        </div>
        <div class="cards">
          <!-- 以下一枚一枚のカード作り -->
          <div class="card">
            <!-- :key="content.id"がないとエラーが出る -->
            <!-- 会社名 -->
            <div class="company-name">
              {{ company.companyName }}
            </div>
            <div
              class="envents"
              v-for="event in company.companyContents.event"
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
    -------------------------------DB内容-------------------------------
    <div class="lists">
      <div class="list" v-for="company in companies1" :key="company.companyId">
        <div class="list-header">
          <a>Header</a>
        </div>
        <div class="cards">
          <!-- 以下一枚一枚のカード作り -->
          <div class="card">
            <!-- :key="content.id"がないとエラーが出る -->
            <!-- 会社名 -->
            <div class="company-name">
              {{ company.companyName }}
            </div>
            <div
              class="envents"
              v-for="event in company.companyContents.event"
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
  </div>
</template>

<style>
.list {
  width: 40%;
  margin: 5%;
  background-color: #42b983;
  display: inline-block;
}
.list-header {
  background-color: bisque;
}
</style>

<script>
// import { doc, getDoc } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore"

import { db } from "../firebase"

export default {
  data() {
    return {
      companies1: [],
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
  async created() {
    const querySnapshot = await getDocs(collection(db, "companies"))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.companies1.push(doc.data())
    })
  },
}
</script>
