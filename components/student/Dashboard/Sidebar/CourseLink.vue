<template>
  <NuxtLink
    class="flex h-14 w-full items-center justify-start gap-3 rounded-xl pl-4 text-lg duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-500/25"
    :class="{ 'bg-neutral-100 dark:bg-neutral-700': route.path.includes(`/student/course/${course.id}/`) || route.path === `/student/course/${course.id}` }"
    :to="`/student/course/${course.id}`"
  >
    <div class="flex h-8 w-2 items-center justify-center overflow-auto rounded-full" :style="{ backgroundColor: subjectColors[course.subject as keyof typeof subjectColors] }"></div>
    <div class="flex w-full flex-col items-start justify-start">
      <p class="w-56 overflow-hidden overflow-ellipsis text-nowrap">{{ course.name }}</p>
      <p class="text-xs">Period {{ course.period }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ course: StudentCourse }>();

const route = useRoute();
</script>

<style scoped></style>
