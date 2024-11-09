<template>
  <div class="flex flex-col items-start justify-start w-full h-full">
    <Loading :show="!loaded" />

    <div v-if="loaded">
      <Transition name="opacity">
        <div v-if="showNotFound" @click="router.push('/teacher/dashboard')" class="z-50 w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <NotFound type="teacher" :message="route.query.course ? 'class' : 'assignment'" @close="router.push('/teacher/dashboard')" @click.stop />
        </div>
      </Transition>

      <div class="w-full flex flex-col items-start justify-center">
        <div class="flex flex-wrap items-start justify-start align-top gap-8" v-if="courses.length > 0">
          <!--prettier-ignore-->
          <TeacherDashboardCard
            @click="router.push(`/teacher/course/${course.id}`)"
            v-for="course in (courses.filter((course) => !('instanceInfo' in course)) as TeacherCourse[])"
            :course="course"
            :key="course.id"
          />
        </div>
        <div class="flex flex-col items-center gap-4" v-else>
          <h2 class="text-4xl md:text-5xl font-extrabold text-[var(--text-color)]" id="no-classes">No classes found!</h2>
          <p class="text-lg text-[var(--text-color)]">It looks like you haven't created any classes yet.</p>
          <p class="text-md text-[var(--text-color)]">Click the button below to create your first class!</p>
          <button @click="router.push('/teacher/create-class')" class="mt-4 px-4 py-2 bg-green-accent text-white rounded-lg hover:bg-gray-600 transition duration-200">Create Class</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  middleware: ["auth", "remove-course"],
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { courses } = storeToRefs(store);

const showNotFound = ref(false);
const loaded = ref(false);

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
// for vitest
defineExpose({ courses, showNotFound, loaded });
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
