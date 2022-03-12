<template>
  <div class="search">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

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
