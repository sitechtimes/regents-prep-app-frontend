<template>
  <div class="relative flex flex-col items-start justify-start rounded-xl">
    <button
      @click="showFilters = !showFilters"
      class="flex h-9 w-9 items-center justify-center rounded-full border bg-white p-0 transition duration-500 lg:w-32 lg:justify-start lg:p-2 lg:px-4 dark:bg-neutral-800"
      :class="
        showFilters
          ? 'border-2 border-[#794dff] shadow-sm shadow-[#794dff38] ring-0 ring-[#794dff]'
          : 'border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-700'
      "
    >
      <img class="size-5 transition duration-500 dark:invert" src="/ui/filter.svg" aria-hidden="true" />
      <p class="hidden grow transition duration-500 lg:block">Filter</p>
    </button>

    <div
      v-show="showFilters"
      class="absolute top-10 z-[2] flex w-52 flex-col items-start justify-center gap-1 rounded-xl border-2 border-neutral-200 bg-white p-3 shadow-md transition duration-500 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <button class="du-label flex w-full cursor-pointer items-center justify-start gap-2" v-for="(filter, key) in filters" @click="selectFilter(key)">
        <input
          type="checkbox"
          class="du-checkbox pointer-events-none"
          style="background-size: cover"
          :style="{ backgroundColor: currentFilters.includes(key) ? 'inherit' : '' }"
          :checked="currentFilters.includes(key)"
        />
        <span class="text-left capitalize transition duration-500">{{ key }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  close: boolean;
}>();
watch(
  () => props.close,
  (val) => {
    if (val) showFilters.value = false;
  }
);
const emit = defineEmits<{
  filter: [TodoFilter];
}>();

const showFilters = ref(false);

const filters: Record<string, TodoFilter> = {
  "not turned in": (assignment) => !assignment.dateSubmitted,
  "turned in": (assignment) => assignment.dateSubmitted !== null,
  ungraded: (assignment) => assignment.assignment.questionsCorrect === undefined,
  graded: (assignment) => assignment.assignment.questionsCorrect !== undefined
};
const currentFilters = ref([""]);
watch(currentFilters, () => emitFilter());

onMounted(emitFilter);

function emitFilter() {
  emit("filter", (assignment: StudentAssignment) => currentFilters.value.every((filter) => filters[filter](assignment)) && currentFilters.value.some((filter) => filters[filter](assignment)));
}

function selectFilter(name: string) {
  if (!currentFilters.value.includes(name)) currentFilters.value = [...currentFilters.value, name];
  else currentFilters.value = currentFilters.value.filter((filter) => filter !== name);
}
</script>

<style scoped></style>
