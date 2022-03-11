<template>
  <div class="home">
    <div class="lists">
      <div class="list">
        <div class="list-header">
          <a>Header</a>
        </div>
        <div class="card"></div>
      </div>
    </div>
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
          contents: {
            event: [
              {
                title: "〇〇会社夏選考",
                category: "選考",
                contents: [],
              },
              {
                title: "〇〇会社秋選考",
                category: "選考",
                contents: [],
              },
            ],
          },
        },
      ],
    }
  },
}
</script>
