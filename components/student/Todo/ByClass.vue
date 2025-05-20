<template>
  <div class="relative flex flex-col items-start justify-start rounded-xl">
    <button
      class="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 p-0 transition duration-500 lg:w-32 lg:justify-start lg:p-2 lg:px-4"
      type="button"
      :class="[buttonClass, queries.length > 0 ? 'bg-green-100 dark:bg-green-700' : 'bg-white dark:bg-neutral-800']"
      @click="showClasses = !showClasses"
    >
      <img class="size-5 transition duration-500 dark:invert" src="/ui/todo.svg" aria-hidden="true" />
      <p class="hidden grow translate-y-px transition duration-500 lg:block">Classes</p>
    </button>

    <Transition name="slide-up">
      <div
        v-show="showClasses"
        class="absolute top-10 z-[2] flex w-52 flex-col items-start justify-center gap-1 rounded-xl border border-neutral-300 bg-white p-3 shadow-lg transition duration-300 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <button v-for="course in studentCourses" class="du-label flex w-full cursor-pointer items-center justify-start gap-2" type="button" @click="updateQuery(course.id)">
          <input type="checkbox" class="du-checkbox pointer-events-none" :checked="route.query.class?.includes(String(course.id))" />
          <span class="translate-y-px text-left capitalize transition duration-300">{{ course.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ close: boolean }>();
const route = useRoute();
const userStore = useUserStore();
const { studentCourses } = storeToRefs(userStore);
const showClasses = ref(false);

const queries = ref<number[]>([]);

async function updateQuery(courseId: number) {
  queries.value = queries.value.includes(courseId) ? queries.value.filter((id) => id !== courseId) : [...queries.value, courseId];
  await changeRouteQuery({ class: queries.value.length ? queries.value : undefined });
}
const buttonClass = computed(() =>
  showClasses.value
    ? "border-2 border-[#794dff] shadow-sm shadow-[#794dff38] ring-0 ring-[#794dff]"
    : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-700"
);
watch(
  () => props.close,
  (val) => {
    if (val) showClasses.value = false;
  }
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
