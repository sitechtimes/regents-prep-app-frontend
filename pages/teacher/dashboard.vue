<template>
  <div class="mx-auto flex h-full w-full flex-col items-center justify-center">
    <div v-if="loaded" class="h-full w-full">
      <NotFound :show-modal="showNotFound" user-type="teacher" :message="route.query.course ? 'class' : 'assignment'" />

      <div class="flex h-full w-full flex-col justify-around overflow-hidden">
        <div v-if="teacherCourses.length > 0" class="mx-auto grid w-full grid-cols-1 place-items-center items-center justify-center md:grid-cols-2 lg:grid-cols-3">
          <!-- mx-auto flex w-full flex-wrap justify-start gap-8 pe-6 ps-8 -->
          <!--prettier-ignore-->
          <TeacherDashboardCard
            v-for="course in (sortedTeacherCourses.filter((course) => !('instanceInfo' in course)) as TeacherCourse[])"
            :key="course.id"
            :course="course"
            class="mx-auto"
            @click="router.push(`/teacher/course/${course.id}`)"
          />
        </div>
        <!--The v-else needs fixing Make it an github issue/lil css-ery will help-->
        <div v-else class="flex h-full w-full items-center justify-center overflow-hidden">
          <div class="flex flex-col items-center gap-4">
            <h2 id="no-classes" class="text-4xl font-extrabold text-[var(--text-color)] md:text-5xl">No classes found!</h2>
            <p class="text-lg text-[var(--text-color)]">It looks like you haven't created any classes yet.</p>
            <p class="text-md text-[var(--text-color)]">Click the button below to create your first class!</p>
            <button class="mt-4 rounded-lg bg-green-accent px-4 py-2 text-white transition duration-200 hover:bg-gray-600" type="button" @click="showCreateClass = true">Create Class</button>
          </div>
        </div>
        <TeacherDashboardCreateClass :show="showCreateClass" @close="showCreateClass = false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "teacher" });

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const { teacherCourses, teacherCurrentCourse } = storeToRefs(store);
const sortedTeacherCourses = computed(() => teacherCourses.value.sort((a, b) => a.period - b.period));
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
  teacherCurrentCourse.value = undefined;
  loaded.value = true;
});
// for vitest
defineExpose({ teacherCourses, showNotFound, loaded });
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
