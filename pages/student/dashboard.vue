<template>
  <div class="flex flex-col items-start justify-start w-full h-full overflow-hidden">
    <div v-if="!loaded">
      <p>loading very hard............</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-full" v-else>
      <Transition name="opacity">
        <div v-if="showNotFound" @click="router.push('/student/dashboard')" class="z-50 w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <NotFound type="student" :message="route.query.course ? 'class' : 'assignment'" @close="router.push('/student/dashboard')" @click="$event.stopPropagation()" />
        </div>
      </Transition>

      <div class="h-screen flex flex-col">
        <div class="flex flex-wrap items-start justify-start align-top gap-8" v-if="courses.length > 0">
          <StudentDashboardCard @click="router.push(`/student/course/${course.id}`)" v-for="course in courses.filter((course) => course.type === 'student')" :course="course" :key="course.id" />
        </div>

        <div class="flex items-center justify-center h-full w-full overflow-hidden" v-else>
          <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl md:text-5xl font-extrabold text-[var(--text-color)]">No Classes Found!</h2>
            <p class="text-lg text-[var(--text-color)]">It looks like you haven't added any classes yet.</p>
            <p class="text-md text-[var(--text-color)]">Click the button below to add your first class!</p>
            <button @click="openTheJoin" class="mt-4 px-4 py-2 bg-green-accent text-white rounded-lg hover:bg-gray-600 transition duration-200">Add Class</button>
          </div>
        </div>
        <StudentJoinClass :show="showJoinClass" @close="showJoinClass = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "remove-course"],
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { courses } = storeToRefs(store);

const showNotFound = ref(false);
const loaded = ref(false);

const showJoinClass = ref(false);

function openTheJoin() {
  console.log("HELP");
  showJoinClass.value = true;
}

watch(
  () => route.query,
  (query) => {
    if (!query.course && !query.assignment) showNotFound.value = false;
  }
);

onBeforeMount(() => {
  if (route.query.course || route.query.assignment) showNotFound.value = true;
});

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped>
.opacity-enter-active,
.opacity-leave-active {
  transition: 0.25s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
