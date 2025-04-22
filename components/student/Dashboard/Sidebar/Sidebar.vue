<template>
  <Transition name="slide-right">
    <div
      v-show="showSideMenu"
      id="side-menu"
      class="sticky left-0 top-16 flex h-[calc(100dvh-4rem)] w-40 flex-col items-start justify-start border-r border-neutral-300 pt-4 md:w-48 lg:w-64 dark:border-neutral-600"
    >
      <!-- dashboard and assignments navigation -->
      <div class="flex w-full flex-col items-center justify-center px-1 dark:border-neutral-600">
        <StudentDashboardSidebarPageLink to="/student/dashboard" img-src="/ui/home.svg" text="Dashboard" />
        <StudentDashboardSidebarPageLink to="/student/todo" img-src="/ui/todo.svg" text="Assignments" />
      </div>

      <!-- dividing line -->
      <div class="my-4 h-px w-full bg-neutral-300 dark:bg-neutral-600"></div>
      <!-- courses list -->
      <div v-if="loaded" class="flex h-full w-full flex-col items-center justify-start px-2">
        <StudentDashboardSidebarCourseLink v-for="course in studentCourses" :key="course.id" :course="course" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  showSideMenu: boolean;
  loaded: boolean;
}>();

const userStore = useUserStore();

const { studentCourses } = storeToRefs(userStore);
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s ease-in-out;
}

/*smaller than medium (minimum 48rem) screens*/
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-40rem);
  width: 0;
}

/*medium screens*/
@media (width >= 48rem) {
  .slide-right-enter-from,
  .slide-right-leave-to {
    transform: translateX(-48rem);
    width: 0;
  }
}

/*large screens*/
@media (width >= 64rem) {
  .slide-right-enter-from,
  .slide-right-leave-to {
    transform: translateX(-64rem);
    width: 0;
  }
}
</style>
