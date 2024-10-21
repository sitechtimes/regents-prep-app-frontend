<template>
  <div class="flex flex-col items-start justify-start w-full h-full">
    <div v-if="!loaded">
      <p>loading very hard............</p>
      <!-- maybe put an animation here -->
    </div>

    <div v-else>
      <Transition name="opacity">
        <div v-if="showNotFound" @click="router.push('/teacher/dashboard')" class="z-50 w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <NotFound type="teacher" :message="route.query.course ? 'class' : 'assignment'" @close="router.push('/teacher/dashboard')" @click="$event.stopPropagation()" />
        </div>
      </Transition>

      <div class="w-full flex flex-col items-start justify-center">
        <div class="flex flex-wrap items-start justify-start align-top gap-8" v-if="courses.length > 0">
          <StudentDashboardCard @click="router.push(`/teacher/course/${course.id}`)" v-for="course in courses.filter((course) => course.type === 'teacher')" :course="course" :key="course.id" />
        </div>
        <div v-else>
          <p>u have no classes try adding some</p>
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
