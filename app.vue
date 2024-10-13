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
        id: 69,
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
        id: 420,
        name: "AP Literature",
        teacher: "Michaen Whalel",
        period: 9,
        subject: "English",
        assignments: [
          {
            type: "student",
            id: 690,
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
            id: 960,
            name: "edgar allen poetry",
            assigned: new Date(),
            due: new Date(new Date().getTime() + 8640000),
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
  document.body.style.display = "flex";
});
</script>

<style scoped></style>
