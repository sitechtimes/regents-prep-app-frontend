<template>
  <div class="flex w-full flex-col items-start justify-start">
    <div v-if="loaded" class="w-full">
      <NotFound :show-modal="showNotFound" user-type="student" :message="route.query.course ? 'class' : 'assignment'" />

      <!--     <div v-if="loaded" class="h-full w-full">
      <Transition name="opacity">
        <div v-if="showNotFound" class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]" @click="router.push('/student/dashboard')">
          <NotFound type="student" :message="route.query.course ? 'class' : 'assignment'" @close="router.push('/student/dashboard')" @click.stop />
        </div>
      </Transition>

      <div class="flex h-full w-full flex-col">
        <div v-if="studentCourses.length > 0" class="flex flex-wrap items-center justify-center gap-8 align-top xl:items-start xl:justify-start"> -->
      <div class="flex w-full flex-col">
        <div v-if="studentCourses.length > 0" class="flex flex-wrap content-start items-start justify-around gap-8">
          <!--prettier-ignore-->
          <StudentDashboardCard
            v-for="course in studentCourses"
            :key="course.id"
            :course="course"
            @click="router.push(`/student/course/${course.id}`)"
          />
        </div>

        <div v-else class="flex h-full w-full items-center justify-center overflow-hidden">
          <div class="flex flex-col items-center gap-4">
            <h2 id="no-classes" class="text-4xl font-extrabold text-[var(--text-color)] md:text-5xl">No classes found!</h2>
            <p class="text-lg text-[var(--text-color)]">It looks like you haven't added any classes yet.</p>
            <p class="text-md text-[var(--text-color)]">Click the button below to add your first class!</p>
            <button class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white transition duration-200 hover:bg-gray-600" type="button" @click="showJoinClass = true">Add Class</button>
          </div>
        </div>
        <StudentDashboardJoinClass :show="showJoinClass" @close="showJoinClass = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "student" });

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { studentCourses, studentCurrentCourse } = storeToRefs(userStore);

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
  studentCurrentCourse.value = undefined;
  loaded.value = true;
});

// for vitest
defineExpose({ studentCourses, showNotFound, showJoinClass, loaded });
</script>

<style scoped></style>
