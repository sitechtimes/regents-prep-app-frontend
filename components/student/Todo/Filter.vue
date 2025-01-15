<template>
  <div class="relative flex flex-col items-start justify-start rounded-xl">
    <button
      @click="toggleFilters"
      class="flex h-9 w-9 items-center justify-center rounded-full border bg-white p-0 transition duration-500 lg:w-32 lg:justify-start lg:p-2 lg:px-4 dark:bg-neutral-800"
      :class="buttonClass"
    >
      <img class="size-5 transition duration-500 dark:invert" src="/ui/filter.svg" aria-hidden="true" />
      <p class="hidden grow transition duration-500 lg:block">Filter</p>
    </button>

    <div
      v-show="showFilters"
      class="absolute top-10 z-[2] flex w-52 flex-col items-start justify-center gap-1 rounded-xl border-2 border-neutral-200 bg-white p-3 shadow-md transition duration-500 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <button class="du-label flex w-full cursor-pointer items-center justify-start gap-2" v-for="(filter, key) in filters" :key="key" @click="selectFilter(key)">
        <input type="checkbox" class="du-checkbox pointer-events-none" :style="{ backgroundColor: getCheckboxBgColor(key) }" :checked="currentFilters.includes(key)" />
        <span class="text-left capitalize transition duration-500">{{ key }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ close: boolean }>();

const emit = defineEmits<{ filter: [TodoFilter] }>();

const showFilters = ref(false);
const currentFilters = ref<string[]>(["all"]);

const filters: Record<string, TodoFilter> = {
  "all": (assignment) => true,
  "not turned in": (assignment) => !assignment.dateSubmitted,
  "turned in": (assignment) => assignment.dateSubmitted !== null,
  ungraded: (assignment) => assignment.questionsCorrect === undefined,
  graded: (assignment) => assignment.questionsCorrect !== undefined
};

const filterExclusions: Record<string, string[]> = {
  "all": ["not turned in", "turned in", "ungraded", "graded"],
  "not turned in": ["turned in"],
  "turned in": ["not turned in"],
  ungraded: ["graded"],
  graded: ["ungraded"]
};

watch(currentFilters, () => emitFilter());
watch(
  () => props.close,
  (val) => (val ? (showFilters.value = false) : null)
);

onMounted(emitFilter);

function emitFilter() {
  emit("filter", (assignment: StudentAssignment) => currentFilters.value.every((filter) => filters[filter](assignment)) && currentFilters.value.some((filter) => filters[filter](assignment)));
}

function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function selectFilter(name: string) {
  currentFilters.value = currentFilters.value.includes(name) ? currentFilters.value.filter((filter) => filter !== name) : [...currentFilters.value, name];

  const exclusions = filterExclusions[name] || [];
  for (const exclude of exclusions) {
    currentFilters.value = currentFilters.value.filter((filter) => filter !== exclude);
  }
}

function getCheckboxBgColor(key: string) {
  return currentFilters.value.includes(key) ? "inherit" : "";
}

const buttonClass = computed(() =>
  showFilters.value
    ? "border-2 border-[#794dff] shadow-sm shadow-[#794dff38] ring-0 ring-[#794dff]"
    : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-700"
);
</script>
