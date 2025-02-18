<template>
  <div class="relative flex flex-col items-start justify-start rounded-xl">
    <button
      class="flex h-9 w-9 items-center justify-center rounded-full border bg-white p-0 transition duration-500 lg:w-32 lg:justify-start lg:p-2 lg:px-4 dark:bg-neutral-800"
      :class="
        showSorters
          ? 'border-2 border-[#794dff] shadow-sm shadow-[#794dff38] ring-0 ring-[#794dff]'
          : 'border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-700'
      "
      type="button"
      @click="showSorters = !showSorters"
    >
      <img class="size-5 transition duration-500 dark:invert" src="/ui/sort.svg" aria-hidden="true" />
      <p class="hidden grow transition duration-500 lg:block">Sort</p>
    </button>

    <Transition name="slide-up">
      <div
        v-show="showSorters"
        class="absolute top-10 z-[2] flex w-44 flex-col items-start justify-center gap-1 rounded-xl border-2 border-neutral-200 bg-white p-3 shadow-lg transition duration-500 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <button v-for="(sorter, key) in sorters" class="du-label flex w-full cursor-pointer items-center justify-start gap-2" type="button" @click="selectSorter(key)">
          <input type="checkbox" class="du-checkbox pointer-events-none bg-cover" :style="{ backgroundColor: currentSorter === key ? 'inherit' : '' }" :checked="currentSorter === key" />
          <span class="text-left capitalize transition duration-500">{{ key }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ close: boolean }>();
const emit = defineEmits<{ sort: [TodoSorter | undefined] }>();

const showSorters = ref(false);

watch(
  () => props.close,
  (val) => {
    if (val) showSorters.value = false;
  }
);

const sorters = {
  "due soon": ((a, b) => a.assignment.dueDate.getTime() - b.assignment.dueDate.getTime()) as TodoSorter,
  latest: ((a, b) => b.assignment.dateAssigned.getTime() - a.assignment.dateAssigned.getTime()) as TodoSorter,
  oldest: ((a, b) => a.assignment.dateAssigned.getTime() - b.assignment.dateAssigned.getTime()) as TodoSorter,
  "most progress": ((a, b) => b.questionsCompleted / b.assignment.numOfQuestions - a.questionsCompleted / a.assignment.numOfQuestions) as TodoSorter,
  "least progress": ((a, b) => a.questionsCompleted / a.assignment.numOfQuestions - b.questionsCompleted / b.assignment.numOfQuestions) as TodoSorter
} as const;

type Sorter = keyof typeof sorters;

const currentSorter = ref<Sorter>("due soon");
watch(currentSorter, (sorter) => emit("sort", sorters[sorter]));

onMounted(() => emit("sort", sorters[currentSorter.value]));

function selectSorter(name: Sorter) {
  if (currentSorter.value === name) return;
  currentSorter.value = name;
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.15s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
