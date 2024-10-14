<template>
  <div
    class="flex flex-col items-center justify-start w-full h-full"
    @click="
      showSorts = false;
      showFilters = false;
    "
  >
    <div v-if="!loaded">
      <p>loading...............................</p>
      <!-- maybe put an animation here -->
    </div>

    <div class="w-full flex items-center justify-center" v-else>
      <div v-if="!currentCourse">
        <h1>this class doesnt exist L</h1>
        <NuxtLink to="/student/dashboard">go back</NuxtLink>
      </div>

      <div class="w-2/3 flex flex-col items-center justify-center" v-else>
        <div class="flex flex-col items-start justify-end w-full h-52 p-6 rounded-2xl" :style="{ backgroundColor: subjectColors[currentCourse.subject] }">
          <h1 class="text-4xl font-semibold">{{ currentCourse.name }}</h1>
          <h3 class="text-lg">Period {{ currentCourse.period }}</h3>
          <h3 class="text-xl">{{ currentCourse.teacher }}</h3>
        </div>

        <div class="w-full flex flex-col items-center justify-center gap-4 mt-5">
          <div class="w-full flex items-center justify-start gap-3">
            <div class="relative">
              <button
                @click="
                  $event.stopPropagation();
                  showFilters = false;
                  showSorts = true;
                "
                :class="{ 'bg-gray-accent': currentSort !== Object.keys(sorts)[0] }"
                class="sort-button py-1 px-5 rounded-full flex items-center justify-center gap-1 border-2 border-gray-accent"
              >
                <img class="w-5 h-5 dark:invert" src="/ui/sort.svg" aria-hidden="true" />
                <p class="text-lg font-medium">Sort</p>
              </button>

              <div v-show="showSorts" class="absolute w-52 z-10 top-12 left-0 p-3 bg-[var(--bg-color)] rounded-xl border-2 border-gray-accent flex flex-col items-start justify-center">
                <button
                  v-for="sort in Object.keys(sorts)"
                  @click="
                    $event.stopPropagation();
                    currentSort = sort;
                  "
                  class="w-full text-xl py-1 rounded-lg"
                  :class="{ 'bg-green-accent': currentSort === sort, 'sort-option': currentSort !== sort }"
                >
                  {{ sort[0].toUpperCase() + sort.slice(1) }}
                </button>
              </div>
            </div>

            <div class="relative">
              <button
                @click="
                  $event.stopPropagation();
                  showSorts = false;
                  showFilters = true;
                "
                :class="{ 'bg-gray-accent': currentFilter !== Object.keys(filters)[0] }"
                class="sort-button py-1 px-5 rounded-full flex items-center justify-center gap-1 border-2 border-gray-accent"
              >
                <img class="w-5 h-5 dark:invert" src="/ui/filter.svg" aria-hidden="true" />
                <p class="text-lg font-medium">Filter</p>
              </button>

              <div v-show="showFilters" class="absolute w-52 z-10 top-12 left-0 p-3 bg-[var(--bg-color)] rounded-xl border-2 border-gray-accent flex flex-col items-start justify-center">
                <button
                  v-for="filter in Object.keys(filters)"
                  @click="
                    $event.stopPropagation();
                    currentFilter = filter;
                  "
                  class="w-full text-xl py-1 rounded-lg"
                  :class="{ 'bg-green-accent': currentFilter === filter, 'sort-option': currentFilter !== filter }"
                >
                  {{ filter[0].toUpperCase() + filter.slice(1) }}
                </button>
              </div>
            </div>

            <button @click="getAssignments" class="sort-button refresh p-2 rounded-full flex items-center justify-center border-2 border-gray-accent">
              <img class="w-5 h-5 dark:invert" src="/ui/refresh.svg" aria-hidden="true" />
            </button>
          </div>

          <StudentAssignmentCard
            v-for="assignment in currentCourse.assignments
              .filter((a) => a.type === 'student')
              .filter(filters[currentFilter])
              .sort(sorts[currentSort])"
            @click="router.push(`/student/course/${currentCourse.id}/${assignment.id}`)"
            :assignment="assignment"
            clickable
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "add-course"],
  requiresAuth: true
});

const router = useRouter();
const store = useUserStore();

const showSorts = ref(false);
const sorts: Record<string, (a: StudentAssignmentOverview, b: StudentAssignmentOverview) => number> = {
  latest: (a, b) => b.assigned.getTime() - a.assigned.getTime(),
  oldest: (a, b) => a.assigned.getTime() - b.assigned.getTime(),
  "closest due": (a, b) => a.due.getTime() - b.due.getTime(),
  "most complete": (a, b) => b.questionsCompleted - a.questionsCompleted
};
const currentSort = ref<keyof typeof sorts>("latest");

const showFilters = ref(false);
const filters: Record<string, (assignment: StudentAssignmentOverview) => boolean> = {
  all: (assignment) => true,
  "not turned in": (assignment) => !assignment.submitted,
  "turned in": (assignment) => assignment.submitted !== null,
  ungraded: (assignment) => assignment.questionsCorrect === null,
  graded: (assignment) => assignment.questionsCorrect !== null
};
const currentFilter = ref<keyof typeof filters>("all");

const { courses, currentCourse } = storeToRefs(store);

const loaded = ref(false);

onMounted(async () => {
  await getAssignments();
});

async function getAssignments() {
  loaded.value = false;
  /* fetch the rest of the course assignments
  and add it to currentcourse.assignments
  and then find the course in courses and add it to that */
  loaded.value = true;
}
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .sort-button:hover,
  .sort-option:hover {
    @apply bg-gray-accent;
  }

  .refresh:hover img {
    @apply duration-700;
    transform: rotate(360deg);
  }
}
</style>
