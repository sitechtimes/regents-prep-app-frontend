<template>
  <div class="flex w-full items-center justify-start gap-3">
    <div class="relative">
      <button
        @click.stop="
          showFilters = false;
          showSorts = !showSorts;
        "
        :class="{ 'bg-gray-accent': currentSort !== Object.keys(sorts)[0] }"
        class="flex items-center justify-center gap-1 rounded-full border border-[var(--border-color)] px-5 py-1 hover:bg-[var(--hover-background)]"
      >
        <img class="h-5 w-5 dark:invert" src="/ui/sort.svg" aria-hidden="true" />
        <p class="text-lg font-medium">Sort</p>
      </button>

      <div v-show="showSorts" class="absolute left-0 top-12 z-10 flex w-52 flex-col items-start justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] p-3">
        <button
          v-for="sort in Object.keys(sorts)"
          :key="sort"
          @click.stop="currentSort = sort"
          class="w-full rounded-lg py-1 pl-4 text-left text-xl"
          :class="{ 'bg-green-accent': currentSort === sort, 'hover:bg-[var(--hover-background)]': currentSort !== sort }"
        >
          {{
            sort
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")
          }}
        </button>
      </div>
    </div>

    <div class="relative">
      <button
        @click.stop="
          showSorts = false;
          showFilters = !showFilters;
        "
        :class="{ 'bg-gray-accent': currentFilter !== Object.keys(filters)[0] }"
        class="flex items-center justify-center gap-1 rounded-full border border-[var(--border-color)] px-5 py-1 hover:bg-[var(--hover-background)]"
      >
        <img class="h-5 w-5 dark:invert" src="/ui/filter.svg" aria-hidden="true" />
        <p class="text-lg font-medium">Filter</p>
      </button>

      <div v-show="showFilters" class="absolute left-0 top-12 z-10 flex w-52 flex-col items-start justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] p-3">
        <button
          v-for="filter in Object.keys(filters)"
          :key="filter"
          @click.stop="currentFilter = filter"
          class="w-full rounded-lg py-1 pl-4 text-left text-xl"
          :class="currentFilter === filter ? 'bg-green-accent' : 'hover:bg-[var(--hover-background)]'"
        >
          {{
            filter
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")
          }}
        </button>
      </div>
    </div>

    <button
      @click.stop="showSorts = showFilters = false"
      class="flex items-center justify-center gap-2 rounded-full border border-[var(--border-color)] p-2 px-4 transition-all"
      :class="{ 'bg-gray-accent dark:bg-dark-hover': search.length > 0 }"
    >
      <img class="h-5 w-5 dark:invert" src="/ui/search.svg" aria-hidden="true" />
      <input class="h-5 bg-transparent transition-all focus-within:outline-0" type="text" placeholder="Search for an assignment" v-model="search" />
    </button>

    <button @click="emit('refresh')" class="refresh flex items-center justify-center rounded-full border border-[var(--border-color)] p-2 hover:bg-[var(--hover-background)]">
      <img class="h-5 w-5 dark:invert" src="/ui/refresh.svg" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  assignments: StudentAssignment[];
  deselect: boolean;
}>();
// prettier-ignore
watch(() => props.deselect, () => showSorts.value = showFilters.value = false);

const emit = defineEmits<{
  filteredAssignments: [StudentAssignment[]];
  refresh: [void];
}>();

const showSorts = ref(false);
const sorts: Record<string, (a: StudentAssignment, b: StudentAssignment) => number> = {
  latest: (a, b) => b.assignment.dateAssigned.getTime() - a.assignment.dateAssigned.getTime(),
  oldest: (a, b) => a.assignment.dateAssigned.getTime() - b.assignment.dateAssigned.getTime(),
  "due soon": (a, b) => a.assignment.dueDate.getTime() - b.assignment.dueDate.getTime(),
  "most progress": (a, b) => b.questionsCompleted / b.assignment.numOfQuestions - a.questionsCompleted / a.assignment.numOfQuestions,
  "least progress": (a, b) => a.questionsCompleted / a.assignment.numOfQuestions - b.questionsCompleted / b.assignment.numOfQuestions
};
const currentSort = ref<keyof typeof sorts>("latest");
watch(currentSort, updateFilter);

const showFilters = ref(false);
const filters: Record<string, (assignment: StudentAssignment) => boolean> = {
  all: () => true,
  "not turned in": (assignment) => assignment.dateSubmitted == null,
  "turned in": (assignment) => assignment.dateSubmitted !== null,
  //ungraded / graded cannot be corrected due to backend having to change the questionsCorrect property
  ungraded: (assignment) => assignment.questionsCorrect === undefined,
  graded: (assignment) => Boolean(assignment.questionsCorrect)
};
const currentFilter = ref<keyof typeof filters>("all");
watch(currentFilter, updateFilter);

const search = ref("");
watch(search, updateFilter);

function updateFilter() {
  emit(
    "filteredAssignments",
    props.assignments
      .filter((a) => a.assignment.name.toLowerCase().includes(search.value.toLowerCase()))
      .filter(filters[currentFilter.value])
      .sort(sorts[currentSort.value])
  );
}

onMounted(updateFilter);
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .refresh:hover img {
    @apply duration-700;
    transform: rotate(360deg);
  }
}
</style>
