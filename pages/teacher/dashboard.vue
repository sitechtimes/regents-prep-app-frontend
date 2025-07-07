<template>
  <div class="flex w-full flex-col items-start justify-start">
    <div v-if="loaded" class="w-full">
      <NotFound :show-modal="showNotFound" user-type="teacher" :message="route.query.course ? 'class' : 'assignment'" />

      <div class="flex w-full flex-col">
        <div v-if="teacherCourses.length > 0" class="flex flex-wrap content-start items-start justify-around gap-8">
          <!--prettier-ignore-->
          <TeacherDashboardCard
            v-for="course in (sortedTeacherCourses.filter((course) => !('instanceInfo' in course)) as TeacherCourse[])"
            :key="course.id"
            :course="course"
          />
        </div>

        <div v-else class="flex h-full w-full items-center justify-center overflow-hidden">
          <div class="flex flex-col items-center gap-4">
            <h2 id="no-classes" class="text-4xl font-extrabold text-[var(--text-color)] md:text-5xl">No classes found!</h2>
            <p class="text-lg text-[var(--text-color)]">It looks like you haven't created any classes yet.</p>
            <p class="text-md text-[var(--text-color)]">Click the button below to create your first class!</p>
            <button class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white hover:bg-gray-600" type="button" @click="showCreateClass = true">Create Class</button>
          </div>
        </div>
        <TeacherDashboardCreateClass :show="showCreateClass" @close="showCreateClass = false" />
      </div>
    </div>
    <ScrolltoTop />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  requiresAuth: true,
  redirectIfAuth: false
});

const route = useRoute();
const store = useUserStore();
const { teacherCourses, teacherCurrentCourse } = storeToRefs(store);

const showNotFound = ref(false);
const loaded = ref(false);
const showCreateClass = ref(false);

const sortedTeacherCourses = computed(() => teacherCourses.value.sort((a, b) => a.period - b.period));

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
  teacherCurrentCourse.value = undefined;
  loaded.value = true;
});

// for vitest
defineExpose({ teacherCourses, showNotFound, loaded });
</script>

<style scoped>
.opacity-enter-active,
.opacity-leave-active {
  transition: 0.2s ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
