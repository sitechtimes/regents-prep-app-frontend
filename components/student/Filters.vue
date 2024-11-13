<template>
  <div class="w-full flex items-center justify-start gap-3">
    <div class="relative">
      <button
        @click.stop="
          showFilters = false;
          showSorts = !showSorts;
        "
        :class="{ 'bg-gray-accent': currentSort !== Object.keys(sorts)[0] }"
        class="hover:bg-gray-accent py-1 px-5 rounded-full flex items-center justify-center gap-1 border-2 border-gray-accent"
      >
        <img class="w-5 h-5 dark:invert" src="/ui/sort.svg" aria-hidden="true" />
        <p class="text-lg font-medium">Sort</p>
      </button>

      <div v-show="showSorts" class="absolute w-52 z-10 top-12 left-0 p-3 bg-[var(--bg-color)] rounded-xl border-2 border-gray-accent flex flex-col items-start justify-center">
        <button
          v-for="sort in Object.keys(sorts)"
          :key="sort"
          @click.stop="currentSort = sort"
          class="w-full text-xl py-1 rounded-lg"
          :class="{ 'bg-green-accent': currentSort === sort, 'hover:bg-gray-accent': currentSort !== sort }"
        >
          {{ sort[0].toUpperCase() + sort.slice(1) }}
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
        class="hover:bg-gray-accent py-1 px-5 rounded-full flex items-center justify-center gap-1 border-2 border-gray-accent"
      >
        <img class="w-5 h-5 dark:invert" src="/ui/filter.svg" aria-hidden="true" />
        <p class="text-lg font-medium">Filter</p>
      </button>

      <div v-show="showFilters" class="absolute w-52 z-10 top-12 left-0 p-3 bg-[var(--bg-color)] rounded-xl border-2 border-gray-accent flex flex-col items-start justify-center">
        <button
          v-for="filter in Object.keys(filters)"
          :key="filter"
          @click.stop="currentFilter = filter"
          class="w-full text-xl py-1 rounded-lg"
          :class="currentFilter === filter ? 'bg-green-accent' : 'hover:bg-gray-accent'"
        >
          {{ filter[0].toUpperCase() + filter.slice(1) }}
        </button>
      </div>
    </div>

    <button
      @click.stop="showSorts = showFilters = false"
      class="p-2 rounded-full flex items-center justify-center gap-1 border-2 border-gray-accent transition-all"
      :class="{ 'bg-gray-accent': search.length > 0 }"
    >
      <img class="w-5 h-5 dark:invert" src="/ui/search.svg" aria-hidden="true" />
      <input class="h-5 bg-transparent transition-all focus-within:outline-0" type="text" placeholder="Search for an assignment" v-model="search" />
    </button>

    <button @click="emit('refresh')" class="hover:bg-gray-accent refresh p-2 rounded-full flex items-center justify-center border-2 border-gray-accent">
      <img class="w-5 h-5 dark:invert" src="/ui/refresh.svg" aria-hidden="true" />
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

const allAssignments = ref<StudentAssignment[]>(props.assignments);

const emit = defineEmits<{
  filteredAssignments: [StudentAssignment[]];
  refresh: [void];
}>();

const showSorts = ref(false);
const sorts: Record<string, (a: StudentAssignment, b: StudentAssignment) => number> = {
  latest: (a, b) => b.dateAssigned.getTime() - a.dateAssigned.getTime(),
  oldest: (a, b) => a.dateAssigned.getTime() - b.dateAssigned.getTime(),
  "closest due": (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
  "most complete": (a, b) => b.instanceInfo.questionsCompleted / b.numOfQuestions - a.instanceInfo.questionsCompleted / a.numOfQuestions,
  "least complete": (a, b) => a.instanceInfo.questionsCompleted / a.numOfQuestions - b.instanceInfo.questionsCompleted / b.numOfQuestions
};
const currentSort = ref<keyof typeof sorts>("latest");
watch(currentSort, updateFilter);

const showFilters = ref(false);
const filters: Record<string, (assignment: StudentAssignment) => boolean> = {
  all: () => true,
  "not turned in": (assignment) => !assignment.instanceInfo.dateSubmitted,
  "turned in": (assignment) => assignment.instanceInfo.dateSubmitted !== null,
  ungraded: (assignment) => assignment.instanceInfo.questionsCorrect === undefined,
  graded: (assignment) => assignment.instanceInfo.questionsCorrect > -1
};
const currentFilter = ref<keyof typeof filters>("all");
watch(currentFilter, updateFilter);

const search = ref("");
watch(search, updateFilter);

function updateFilter() {
  emit(
    "filteredAssignments",
    allAssignments.value
      .filter((a) => a.name.toLowerCase().includes(search.value.toLowerCase()))
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
