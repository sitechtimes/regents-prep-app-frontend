<template>
  <div class="relative flex flex-col items-start justify-start rounded-xl">
    <button
      class="flex h-9 w-9 items-center justify-center rounded-full border bg-white p-0 transition duration-500 lg:w-32 lg:justify-start lg:p-2 lg:px-4 dark:bg-neutral-800"
      type="button"
      @click="showClasses = !showClasses"
    >
      <img class="size-5 transition duration-500 dark:invert" src="/ui/filter.svg" aria-hidden="true" />
      <p class="hidden grow transition duration-500 lg:block">Classes</p>
    </button>

    <Transition name="slide-up">
      <div
        v-show="showClasses"
        class="absolute top-10 z-[2] flex w-52 flex-col items-start justify-center gap-1 rounded-xl border-2 border-neutral-200 bg-white p-3 shadow-lg transition duration-500 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <button
          v-for="course in props.studentCourses"
          :key="course"
          class="du-label flex w-full cursor-pointer items-center justify-start gap-2"
          type="button"
          @click="router.replace({ query: { class: `${course.id}` } })"
        >
          <input type="checkbox" class="du-checkbox pointer-events-none" :checked="route.query.class === String(course.id)" />
          <span class="text-left capitalize transition duration-500">{{ course.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ studentCourses: [StudentCourse] }>();
const showClasses = ref(false);

const router = useRouter();

const route = useRoute();
</script>
