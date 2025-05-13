<template>
  <div class="relative flex flex-col items-start justify-start rounded-xl">
    <!-- filter button -->
    <button
      class="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 p-0 transition duration-500 lg:w-32 lg:justify-start lg:p-2 lg:px-4"
      :class="[buttonClass, !currentFilters.find((filter) => filter === 'all') ? 'bg-green-100 dark:bg-green-700' : 'bg-white dark:bg-neutral-800']"
      type="button"
      @click="showFilters = !showFilters"
    >
      <img class="size-5 transition duration-500 dark:invert" src="/ui/filter.svg" aria-hidden="true" />
      <p class="hidden grow translate-y-px transition duration-500 lg:block">Filter</p>
    </button>

    <!-- filters dropdown selection-->
    <Transition name="slide-up">
      <div
        v-show="showFilters"
        class="absolute top-10 z-[2] flex w-52 flex-col items-start justify-center gap-1 rounded-xl border border-neutral-300 bg-white p-3 shadow-lg transition duration-300 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <button v-for="(filter, key) in filters" :key="key" class="du-label flex w-full cursor-pointer items-center justify-start gap-2" type="button" @click="selectFilter(key)">
          <input type="radio" class="!du-radio pointer-events-none" :style="{ backgroundColor: getCheckboxBgColor(key) }" :checked="currentFilters.includes(key)" />
          <span class="text-left capitalize transition duration-500">{{ key }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ close: boolean }>();
const emit = defineEmits<{ filter: [TodoFilter] }>();

const currentDate = new Date();

const filters = {
  all: (() => true) as TodoFilter,
  "not turned in": ((assignment) => !assignment.dateSubmitted) as TodoFilter,
  "turned in": ((assignment) => assignment.dateSubmitted !== null) as TodoFilter,
  "past due": ((assignment) => assignment.assignment.dueDate && assignment.assignment.dueDate < currentDate) as TodoFilter,
  "not due": ((assignment) => assignment.assignment.dueDate && assignment.assignment.dueDate >= currentDate) as TodoFilter,
  ungraded: ((assignment) => assignment.questionsCorrect === undefined) as TodoFilter,
  graded: ((assignment) => assignment.questionsCorrect !== undefined) as TodoFilter
} as const;

type Filter = keyof typeof filters;

const filterExclusions: Readonly<Record<Filter, Filter[]>> = {
  all: ["not turned in", "turned in", "past due", "not due", "ungraded", "graded"],
  "not turned in": ["turned in"],
  "turned in": ["not turned in"],
  "past due": ["not due"],
  "not due": ["past due"],
  ungraded: ["graded"],
  graded: ["ungraded"]
};

const showFilters = ref(false);
const currentFilters = ref<Filter[]>(["all"]);

function emitFilter() {
  emit("filter", (assignment: StudentAssignment) => currentFilters.value.every((filter) => filters[filter](assignment)));
}

watch(currentFilters, () => emitFilter());
watch(
  () => props.close,
  (val) => {
    if (val) showFilters.value = false;
  }
);

onMounted(emitFilter);

function selectFilter(name: Filter) {
  // prettier-ignore
  currentFilters.value = (currentFilters.value.includes(name) 
  ? currentFilters.value.filter((filter) => filter !== name) 
  : [...currentFilters.value, name]
  ).filter((filter) => !filterExclusions[name].includes(filter) && filter !== "all");

  if (currentFilters.value.length === 0) currentFilters.value = ["all"];
}

function getCheckboxBgColor(key: Filter) {
  return currentFilters.value.includes(key) ? "inherit" : "";
}

const buttonClass = computed(() =>
  showFilters.value
    ? "border-2 border-[#794dff] shadow-sm shadow-[#794dff38] ring-0 ring-[#794dff]"
    : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-700"
);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: none 0.2s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
