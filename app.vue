<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const store = useUserStore();
const { courses } = storeToRefs(store);

onBeforeMount(() => {
  store.isAuth = true;

  // sample course info
  if (store.isAuth)
    courses.value = [
      {
        type: "student",
        id: 1,
        name: "AP Calculus CD",
        teacher: "Wichael Mhalen",
        period: 7,
        subject: "Math",
        assignments: [
          {
            type: "student",
            id: 420,
            name: "power rule practice",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 3600000),
            questionsLength: 5,
            allowLate: false,
            questionsCompleted: 3,
            submitted: null
          },
          {
            type: "student",
            id: 421,
            name: "chain rule practice",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 86400000),
            questionsLength: 50,
            allowLate: false,
            questionsCompleted: 2,
            submitted: null
          }
        ]
      },
      {
        type: "student",
        id: 2,
        name: "AP Literally Not Fun",
        teacher: "Michaen Whalel",
        period: 9,
        subject: "English",
        assignments: [
          {
            type: "student",
            id: 422,
            name: "poetry analysis",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 600000),
            questionsLength: 7,
            allowLate: false,
            questionsCompleted: 2,
            submitted: null
          },
          {
            type: "student",
            id: 423,
            name: "edgar allen poetry",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 8640000),
            questionsLength: 3,
            allowLate: false,
            questionsCompleted: 3,
            submitted: null
          }
        ]
      },
      {
        type: "student",
        id: 3,
        name: "AP USSR Government & Politics",
        teacher: "Whalem Nichael",
        period: 8,
        subject: "History",
        assignments: [
          {
            type: "student",
            id: 424,
            name: "october revolution",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 864000000),
            questionsLength: 7,
            allowLate: false,
            questionsCompleted: 2,
            submitted: null
          },
          {
            type: "student",
            id: 425,
            name: "blyat",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 87400000),
            questionsLength: 3,
            allowLate: false,
            questionsCompleted: 3,
            submitted: null
          }
        ]
      },
      {
        type: "student",
        id: 4,
        name: "Not Russian",
        teacher: "Nichael Whalem",
        period: 4,
        subject: "Russian",
        assignments: [
          {
            type: "student",
            id: 426,
            name: "super idol de xiao rong",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 127400000),
            questionsLength: 7,
            allowLate: false,
            questionsCompleted: 2,
            submitted: null
          },
          {
            type: "student",
            id: 427,
            name: "xue hua piao piao",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 2127400000),
            questionsLength: 3,
            allowLate: false,
            questionsCompleted: 3,
            submitted: null
          }
        ]
      },
      {
        type: "student",
        id: 5,
        name: "AP Psychological Warfare",
        teacher: "Mhalen Wichael",
        period: 5,
        subject: "Science",
        assignments: [
          {
            type: "student",
            id: 428,
            name: "outline 47",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 8027400000),
            questionsLength: 7,
            allowLate: false,
            questionsCompleted: 2,
            submitted: null
          },
          {
            type: "student",
            id: 429,
            name: "outline 594759",
            assigned: new Date(),
            due: new Date(8640000000000000),
            questionsLength: 3,
            allowLate: false,
            questionsCompleted: 3,
            submitted: null
          }
        ]
      }
    ];

  // get theme and shit
});

onMounted(() => {
  document.body.style.display = "block";
});
</script>

<style scoped></style>
