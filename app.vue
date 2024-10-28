<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();

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
        period: 2,
        subject: "Math",
        assignments: [
          {
            type: "student",
            id: 420,
            name: "Power Rule practice",
            assigned: new Date(new Date().getTime() - 86400000),
            due: new Date(new Date().getTime() + 3600000),
            questionsLength: 5,
            allowLate: false,
            questionsCompleted: 3,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 421,
            name: "Chain Rule practice",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 86400000),
            questionsLength: 50,
            allowLate: false,
            questionsCompleted: 2,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 422,
            name: "Chaid Rule practice",
            assigned: new Date(new Date().getTime() + 500000),
            due: new Date(new Date().getTime() + 86400001),
            questionsLength: 50,
            allowLate: false,
            questionsCompleted: 2,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 423,
            name: "Chaim Rule practice",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 86400001),
            questionsLength: 50,
            allowLate: false,
            questionsCompleted: 2,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 424,
            name: "Chail Rule practice",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 86400000),
            questionsLength: 50,
            allowLate: false,
            questionsCompleted: 2,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 425,
            name: "Chaik Rule practice",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 86400001),
            questionsLength: 50,
            allowLate: false,
            questionsCompleted: 2,
            questionsCorrect: null,
            submitted: null
          }
        ],
        assignmentsLength: 6
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
            id: 426,
            name: "Poetry Analysis",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 600000),
            questionsLength: 7,
            allowLate: false,
            questionsCompleted: 2,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 427,
            name: "Edgar Allen Poetry",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 8640000),
            questionsLength: 3,
            allowLate: false,
            questionsCompleted: 3,
            questionsCorrect: null,
            submitted: null
          }
        ],
        assignmentsLength: 2
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
            id: 428,
            name: "October Revolution",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 864000000),
            questionsLength: 4,
            allowLate: false,
            questionsCompleted: 4,
            questionsCorrect: 4,
            submitted: new Date()
          },
          {
            type: "student",
            id: 429,
            name: "Joseph Stalin Biography",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 87400000),
            questionsLength: 30,
            allowLate: false,
            questionsCompleted: 30,
            questionsCorrect: 7,
            submitted: new Date()
          },
          {
            type: "student",
            id: 430,
            name: "95 Reasons Why Trotsky is a Traitor to the People",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 87400000),
            questionsLength: 95,
            allowLate: false,
            questionsCompleted: 9,
            questionsCorrect: null,
            submitted: null
          }
        ],
        assignmentsLength: 3
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
            id: 431,
            name: "Super idol de xiao rong",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 127400000),
            questionsLength: 50,
            allowLate: false,
            questionsCompleted: 50,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 432,
            name: "Xue hua piao piao",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 2127400000),
            questionsLength: 3,
            allowLate: false,
            questionsCompleted: 3,
            questionsCorrect: null,
            submitted: null
          }
        ],
        assignmentsLength: 2
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
            id: 433,
            name: "Outline 47",
            assigned: new Date(new Date().getTime() - 864000000),
            due: new Date(new Date().getTime() + 8027400000),
            questionsLength: 9,
            allowLate: false,
            questionsCompleted: 2,
            questionsCorrect: null,
            submitted: null
          },
          {
            type: "student",
            id: 434,
            name: "Outline 594759",
            assigned: new Date(),
            due: new Date(8640000000000000),
            questionsLength: 3609826,
            allowLate: false,
            questionsCompleted: 0,
            questionsCorrect: null,
            submitted: null
          }
        ],
        assignmentsLength: 2
      }
    ];

  // get theme and shit
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    userStore.theme = "dark";
  }
});

onMounted(() => {
  userStore.init();
  document.body.style.display = "block";
});
</script>

<style scoped></style>
