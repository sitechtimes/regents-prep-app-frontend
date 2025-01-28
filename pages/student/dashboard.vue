<template>
  <div class="flex h-full w-full flex-col items-start justify-start overflow-hidden">
    <Loading :show="!loaded" />

    <div v-if="loaded" class="h-full w-full">
      <Transition name="opacity">
        <div v-if="showNotFound" class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]" @click="router.push('/student/dashboard')">
          <NotFound type="student" :message="route.query.course ? 'class' : 'assignment'" @close="router.push('/student/dashboard')" @click.stop />
        </div>
      </Transition>

      <div class="flex h-full w-full flex-col">
        <div v-if="courses.length > 0" class="flex flex-wrap items-start justify-start gap-8 align-top ">
          <!--prettier-ignore-->
          <StudentDashboardCard
            v-for="course in (courses.filter((course) => !('joinCode' in course)) as StudentCourse[])"
            :key="course.id"
            :course="course"
            @click="router.push(`/student/course/${course.id}`)"
          />
        </div>
        <!--Fix Later-->
        <div v-else class="flex h-full w-full items-center justify-center overflow-hidden">
          <div class="flex flex-col items-center gap-4">
            <h2 id="no-classes" class="text-4xl font-extrabold text-[var(--text-color)] md:text-5xl">No classes found!</h2>
            <p class="text-lg text-[var(--text-color)]">It looks like you haven't added any classes yet.</p>
            <p class="text-md text-[var(--text-color)]">Click the button below to add your first class!</p>
            <button class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white transition duration-200 hover:bg-gray-600" type="button" @click="showJoinClass = true">Add Class</button>
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
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { courses, currentCourse } = storeToRefs(userStore);

const showNotFound = ref(false);
const loaded = ref(false);

const showJoinClass = ref(false);

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
  currentCourse.value = undefined;
  loaded.value = true;
});

// for vitest
defineExpose({ courses, showNotFound, showJoinClass, loaded });
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
