<template>
  <div class="flex flex-col items-start justify-start w-full h-full">
    <div v-if="!loaded">
      <p>loading very hard............</p>
    </div>

    <div v-else class="w-full flex flex-col items-start justify-center">
      <div class="flex flex-wrap items-start justify-start align-top gap-8" v-if="courses.length > 0">
        <StudentDashboardCard @click="router.push(`/student/course/${course.id}`)" v-for="course in courses.filter((course) => course.type === 'student')" :course="course" :key="course.id" />
      </div>
      <div v-else>
        <p>u have no classes try adding some</p>
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

const store = useUserStore();
const router = useRouter();

const { courses } = storeToRefs(store);
const currentTime = ref(new Date());

const loaded = ref(false);

onMounted(() => {
  loaded.value = true;
});
</script>

<style scoped></style>
