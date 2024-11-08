<template>
  <div class="flex flex-col items-center justify-start w-full h-full">
    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-full flex items-center justify-center" v-else>
      <div class="w-2/3 flex flex-col items-center justify-center" v-if="assignment">
        <p>Subject Review / Assignment</p>
        <!-- placeholder text for now -->
        <p>
          You have
          <span v-if="assignment.assignment.timerStyle == 'UT'">Unlimited Time</span>
          <span v-else-if="assignment.assignment.timerStyle == 'TT'">{{ assignment.assignment.timeAllotted }} minutes</span>
          <span v-else>{{ assignment.assignment.timeAllotted }} minutes per question </span>
          to complete this assignment
        </p>
        <p>
          {{ assignment.questionsCompleted }}/{{ assignment.assignment.numOfQuestions }}
          <span>({{ Math.floor((assignment.questionsCompleted / assignment.assignment.numOfQuestions) * 100) }}% completed)</span>
        </p>
        <button v-if="!start" class="mt-4 px-4 py-2 bg-green-accent text-white rounded-lg hover:bg-gray-600 transition duration-200" @click="startTest">Start</button>
        <div v-else class="bg-green-accent">
          <div v-html="question?.question.text"></div>

          <button class="block bg-[rgb(200,0,0)] w-full hover:bg-[rgb(0,200,0)]" v-if="question?.question.answerType === 'Multiple Choice'" v-for="choice in question.question.answers">
            <p class="inline" v-html="choice.text"></p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "add-course"],
  requiresAuth: true
});

const userStore = useUserStore();
const route = useRoute();
const loaded = ref(false);
const assignment = ref<AssignmentInstance>();
const start = ref(false);
const question = ref<QuestionInterface>();

async function startTest() {
  if (!assignment.value) return;
  question.value = await getNextQuestion(assignment.value.id);
  start.value = true;
}

onMounted(() => {
  loadAssignment();
});

userStore.$subscribe(() => {
  loadAssignment();
});

let ran = false;
async function loadAssignment(redirect = false) {
  if (ran && !redirect) return;
  ran = true;
  assignment.value = (await getStudentAssignment(Number(route.params.assignmentId), Number(route.params.courseCode))) as AssignmentInstance;
  loaded.value = true;
}
</script>

<style scoped></style>
