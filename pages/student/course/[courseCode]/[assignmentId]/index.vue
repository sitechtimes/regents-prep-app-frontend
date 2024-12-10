<template>
  <div class="flex h-full w-full flex-col items-center justify-start">
    <Loading :show="!loaded" />

    <div class="flex w-full items-center justify-center " v-if="loaded">
      <div class="flex w-[90vw] h-[90vh] flex-col items-center justify-center bg-red-100 rounded-lg border border-[var(--faded-bg-color)] transition-all duration-300 ease-in-out hover:border-[var(--primary)] hover:shadow-lg hover:dark:shadow-[var(--gray)] " v-if="currentCourse">
        <div class="rounded-[7px] bg-green-100 w-full h-[90vh]" v-if="currentAssignment" :assignment="currentAssignment">
          <div class="w-full h-[10%] rounded-t-[7px] overflow-hidden overflow-ellipsis text-nowrap text-5xl font-semibold bg-purple-300 flex justify-center items-center">
            Assignment Name
          </div>
          <div class="w-full h-[70%] bg-gray-300">
            <!-- <div class="h-[10%] bg-red-100 flex flex-col justify-center items-center ">
              <div>Questions</div>
              <div>< 1 , 2 , 3 , 4 , 5 ></div>
            </div> -->
            <div>
              put question in here
            </div>
          </div>
          <div class="font-bold text-3xl w-full h-[5%] bg-pink-200 flex justify-center items-center ">
             <div class="">Question x / y</div>
          </div>
          <div class="w-full h-[15%] bg-yellow-200 flex justify-between items-center p-3">
            <div class="bg-orange-200 w-[50%] font-bold text-2xl m-2">
              <div>Attempts Left: </div>
              <div>Due Oct. 20, 2024 11:59PM</div>
            </div>
            <button class="bg-blue-200 w-[50%] font-bold text-2xl flex items-center justify-center">
              Submit Question
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: "auth",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const currentAssignment = ref<StudentAssignment>();
const { courses, currentCourse, initComplete } = storeToRefs(userStore);

const loaded = ref(false);

onMounted(() => {
  getCourse();
});

userStore.$subscribe(async () => {
  getCourse();
});

function getCourse() {
  if (!initComplete.value) return;

  const routeCode = route.params.assignmentId as string;
  const courseCode = Number(route.params.courseCode);
  currentCourse.value = courses.value.find((course) => course.id === courseCode);
  currentAssignment.value = currentCourse.value?.assignments.find((assignment) => assignment.id === Number(routeCode) && "instanceInfo" in assignment) as StudentAssignment;

  if (!currentCourse.value) return router.push(`/student/dashboard?course=${courseCode}`);
  if (!currentAssignment.value) return router.push(`/student/dashboard?assignment=${routeCode}`);
  loaded.value = true;
}
</script>

<style scoped></style>
