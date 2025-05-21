<template>
  <button
    class="border-b-4 px-4 transition"
    :class="{ 'grayscale hover:grayscale-[.66]': isInactive }"
    :style="{ borderColor: subjectColors[course.subject] }"
    type="button"
    @click="emit('switchTab', tabName)"
  >
    <!-- TODO: tailwind capitalize doesnt work only on questions tab when its disabled ?? -->
    <span class="text-lg font-semibold capitalize lg:text-2xl" :class="{ 'text-neutral-500': isInactive }">{{ tabName[0].toUpperCase() + tabName.slice(1) }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabName: string;
  currentTab: string;
  course: TeacherCourse;
}>();
const emit = defineEmits<{ switchTab: [string] }>();

const isInactive = computed(() => props.currentTab !== props.tabName);
</script>

<style scoped></style>
