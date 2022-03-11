<template>
  <div class="home">
    <div class="lists">
      <div class="list">
        <div class="list-header">
          <a>Header</a>
        </div>
        <div class="cards">
          <!-- 以下一枚一枚のカード作り -->
          <div
            class="card"
            v-for="company in companies"
            :key="company.companyId"
          >
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
.card {
  width: 40%;
  margin: 5%;
  background-color: #42b983;
  display: inline-block;
}
</style>

<script>
export default {
  data() {
    return {
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
}
</script>
