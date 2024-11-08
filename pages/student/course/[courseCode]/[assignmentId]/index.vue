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
          <p>Time Left {{ assignment.assignment.timerStyle === "TPQ" ? "For This Question" : "" }}: {{ timer }}</p>
          <div v-html="question?.question.text"></div>

          <button
            class="block bg-[rgb(200,0,0)] w-full hover:bg-[rgb(0,200,0)]"
            v-if="question?.question.answerType === 'Multiple Choice'"
            v-for="choice in question.question.answers"
            @click="answer = choice.id"
          >
            <p class="inline" v-html="choice.text"></p>
          </button>
          <button class="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition duration-200" @click="submitAnswer">Submit</button>
          <p v-if="assignment.assignment.attemptsAllowed > 1">Attempts left: {{ submit.remainingAttempts }}</p>
        </div>
        <button class="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition duration-200" @click="submitAssignment">Submit Assignment</button>
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
const answer = ref<number>();
const submit = ref<SubmitAnswer>();
const timer = ref("00:00");

async function submitAnswer() {
  if (!assignment.value || !question.value || !answer.value) return;
  submit.value = await submitQuestionAnswer(question.value.id, answer.value);
  if (submit.value.isCorrect || submit.value.remainingAttempts === 0) {
    question.value = await getNextQuestion(assignment.value.id);
    submit.value = { isCorrect: false, remainingAttempts: assignment.value.assignment.attemptsAllowed };
    answer.value = undefined;
  }
}

async function submitAssignment() {
  if (!assignment.value) return;
  // Warn user if not all questions answered
  const res = await submitAssignmentReq(assignment.value.id);

  if (res) {
    alert("Assignment submitted successfully!");
    start.value = false;
  }
}

async function startTest() {
  if (!assignment.value) return;
  if (assignment.value.assignment.timerStyle === "TT") {
    const endTime = new Date().getTime() + assignment.value.assignment.timeAllotted * 60000;
    const interval = setInterval(() => {
      const timeLeft = endTime - new Date().getTime();
      if (timeLeft <= 0) {
        clearInterval(interval);
        alert("Time's up! You may continue woking but the assignment will be marked late.");
        return;
      }
      timer.value = new Date(timeLeft).toISOString().substr(14, 5);
    }, 1000);
  }
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
  submit.value = { isCorrect: false, remainingAttempts: assignment.value.assignment.attemptsAllowed };
  timer.value = `${String(assignment.value.assignment.timeAllotted).padStart(2, "0")}:00`;
  loaded.value = true;
}
</script>

<style scoped></style>
