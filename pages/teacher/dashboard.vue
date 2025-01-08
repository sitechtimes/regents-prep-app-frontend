<template>
  <div class="flex h-full w-full flex-col items-start justify-start">
    <Loading :show="!loaded" />

    <div class="h-full w-full" v-if="loaded">
      <Transition name="opacity">
        <div v-if="showNotFound" @click="router.push('/teacher/dashboard')" class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <NotFound type="teacher" :message="route.query.course ? 'class' : 'assignment'" @close="router.push('/teacher/dashboard')" @click.stop />
        </div>
      </Transition>

      <div class="flex h-full w-full flex-col">
        <div class="flex flex-wrap items-start justify-start gap-8 align-top" v-if="courses.length > 0">
          <!--prettier-ignore-->
          <TeacherDashboardCard
            @click="router.push(`/teacher/course/${course.id}`)"
            v-for="course in (courses.filter((course) => !('instanceInfo' in course)) as TeacherCourse[])"
            :course="course"
            :key="course.id"
          />
        </div>
        <!--The v-else needs fixing Make it an github issue/lil css-ery will help-->
        <div class="flex h-full w-full items-center justify-center overflow-hidden" v-else>
          <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-extrabold text-[var(--text-color)] md:text-5xl" id="no-classes">No classes found!</h2>
            <p class="text-lg text-[var(--text-color)]">It looks like you haven't created any classes yet.</p>
            <p class="text-md text-[var(--text-color)]">Click the button below to create your first class!</p>
            <button @click="showCreateClass = true" class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white transition duration-200 hover:bg-gray-600">Create Class</button>
          </div>
        </div>
        <TeacherCreateClass :show="showCreateClass" @close="showCreateClass = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "teacher",
  requiresAuth: true
});

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { courses, currentCourse } = storeToRefs(store);

const showNotFound = ref(false);
const loaded = ref(false);
const showCreateClass = ref(false);

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
