<template>
  <Transition name="slide-right">
    <div
      v-show="showSideMenu"
      id="side-menu"
      class="fixed left-0 top-16 z-20 flex h-[calc(100dvh-4rem)] w-full flex-col items-start justify-start border-neutral-300 bg-body pt-4 xs:w-96 xs:border-r md:sticky dark:border-neutral-600"
    >
      <div class="flex w-full flex-col items-center justify-center px-2 dark:border-neutral-600">
        <TeacherDashboardSidebarPageLink to="/teacher/dashboard" img-src="/ui/home.svg" text="Dashboard" />
        <TeacherDashboardSidebarPageLink to="/teacher/create-assignment" img-src="/ui/todo.svg" text="New Assignment" />
        <TeacherDashboardSidebarPageLink to="/teacher/create-assignment?print=true" img-src="/ui/document.svg" text="Print Worksheet" />
      </div>

      <div class="my-4 h-px w-full bg-neutral-300 dark:bg-neutral-600"></div>

      <div v-if="loaded" class="flex h-full w-full flex-col items-center justify-start px-2">
        <TeacherDashboardSidebarCourseLink v-for="course in teacherCourses" :key="course.id" :course="course" />
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

const { teacherCourses } = storeToRefs(userStore);
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-24rem);
  width: 0;
}
</style>
