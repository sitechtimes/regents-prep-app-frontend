<template>
  <div>
    <h1>ur classes</h1>
    <div class="flex flex-wrap items-center justify-center align-top gap-4">
      <div @click="router.push(`/course/${course.id}`)" v-for="course in courses" class="cursor-pointer border rounded-lg overflow-hidden w-80 flex flex-col items-center justify-center">
        <div class="w-full h-24 flex flex-col items-start justify-end p-2" :style="{ backgroundColor: subjectColors[course.subject] }">
          <h3 class="text-2xl font-semibold">{{ course.name }}</h3>
          <p class="text-sm">Period {{ course.period }}</p>
          <p>{{ course.teacher }}</p>
        </div>
        <div class="flex flex-col items-start justify-start w-full min-h-64 p-2 gap-2">
          <h2 class="font-bold">assignments</h2>
          <div class="flex flex-col items-start justify-center" v-if="course.assignments.length > 0">
            <div v-for="assignment in course.assignments">
              <p class="font-medium" :title="assignment.due.toLocaleString()">due {{ formatDate(assignment.due) }}</p>
              <RouterLink class="assignment" :to="`/course/${course.id}/${assignment.id}`" @click="$event.stopPropagation()">
                <span>{{ assignment.name }}</span>
                <span v-if="assignment.type === 'student'"> ({{ assignment.questionsCompleted }}/{{ assignment.questionsLength }})</span>
              </RouterLink>
            </div>
          </div>
          <p v-else>no assignments W</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useUserStore();
const router = useRouter();

const { courses } = storeToRefs(store);
const currentTime = ref(new Date());

const subjectColors = {
  Math: "limegreen",
  Science: "cyan",
  English: "cyan",
  History: "cyan",
  Russian: "cyan"
};

// sample course info
onMounted(() => {
  courses.value = [
    {
      type: "student",
      id: 69,
      name: "AP Calculus CD",
      teacher: "Wichael Mhalen",
      period: 7,
      joinCode: "800085",
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
      joinCode: "800813",
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
});

function formatDate(date: Date) {
  const current = currentTime.value.getTime();
  const diffSeconds = Math.round((date.getTime() - current) / 1000);

  const dateHour = date.toLocaleString("default", { hour12: true, hour: "numeric", minute: "2-digit" });

  if (diffSeconds < 0) return `yesterday at ${dateHour}`;
  else if (diffSeconds < 86400) return `today at ${dateHour}`;
  else if (diffSeconds < 86400 * 2) return `tomorrow at ${dateHour}`;
  else if (diffSeconds < 86400 * 7) return date.toLocaleDateString("default", { weekday: "long" });
  else if (diffSeconds < 86400 * 14) return `next ${date.toLocaleDateString("default", { weekday: "long" })}`;
  else return date.toLocaleString();
}
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .assignment:hover {
    text-decoration: underline;
  }
}
</style>
