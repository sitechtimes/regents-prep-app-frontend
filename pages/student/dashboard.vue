<template>
  <div class="flex w-full flex-col items-start justify-start">
    <div v-if="loaded" class="w-full">
      <NotFound :show-modal="showNotFound" user-type="student" :message="route.query.course ? 'class' : 'assignment'" />

      <div class="flex w-full flex-col">
        <div v-if="studentCourses.length > 0" class="flex flex-wrap content-start items-start justify-around gap-8">
          <!--prettier-ignore-->
          <StudentDashboardCard
            v-for="course in studentCourses"
            :key="course.id"
            :course="course"
          />
        </div>

        <div v-else class="flex h-full w-full items-center justify-center overflow-hidden">
          <div class="flex flex-col items-center gap-4">
            <h2 id="no-classes" class="text-4xl font-extrabold text-[var(--text-color)] md:text-5xl">No classes found!</h2>
            <p class="text-lg text-[var(--text-color)]">It looks like you haven't added any classes yet.</p>
            <p class="text-md text-[var(--text-color)]">Click the button below to add your first class!</p>
            <button class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white transition duration-300 hover:bg-gray-600" type="button" @click="showJoinClass = true">Add Class</button>
          </div>
        </div>
        <StudentDashboardJoinClass :show="showJoinClass" @close="showJoinClass = false" />
      </div>
    </div>
    <button v-if="showScrollToTop" @click="scrollToTop" class="fixed bottom-6 right-6 z-10 rounded-lg bg-gray-200 px-4 py-2 text-lg shadow-lg">↑ Top</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  requiresAuth: true,
  redirectIfAuth: false
});

const route = useRoute();
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
  window.addEventListener("scroll", checkScroll);
});
const showScrollToTop = ref(false);

const checkScroll = () => {
  const pageHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;

  if (pageHeight > viewportHeight * 2 && scrollTop > viewportHeight / 2) {
    showScrollToTop.value = true;
  } else {
    showScrollToTop.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});

// for vitest
defineExpose({ studentCourses, showNotFound, showJoinClass, loaded });
</script>

<style scoped></style>
