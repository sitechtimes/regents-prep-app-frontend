<template>
  <div
    ref="toolbar"
    class="sticky top-20 z-50 mt-4 flex flex-wrap items-center justify-center gap-4 rounded-full border-transparent bg-body px-5 py-2 transition duration-500 xl:flex-nowrap"
    :class="{ 'shadow-lg dark:border dark:border-neutral-700': isSticky }"
  >
    <StudentTodoByClass v-if="route.path === `/student/todo`" :close="closeClasses" @click.stop="closeOptions(true, true, true, false)" />
    <StudentTodoSort :close="closeSorters" @sort="(sorter) => emit('sort', sorter)" @click.stop="closeOptions(true, true, false, true)" />
    <StudentTodoFilter :close="closeFilters" @filter="(filter) => emit('filter', filter)" @click.stop="closeOptions(true, false, true, true)" />
    <StudentTodoSearch @search="(term) => emit('search', term)" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ closeToolbar: boolean }>();
const emit = defineEmits<{
  sort: [TodoSorter | undefined];
  filter: [TodoFilter];
  search: [string];
}>();

const toolbar = useTemplateRef("toolbar");
const isSticky = ref(false);

const route = useRoute();

const closeFilters = ref(false);
const closeSorters = ref(false);
const closeSettings = ref(false);
const closeClasses = ref(false);

let previousPosition = 0;
function detectSticky() {
  if (!toolbar.value) return;
  const newPosition = toolbar.value.getBoundingClientRect().top;

  if (newPosition === previousPosition) return void (isSticky.value = true);

  previousPosition = newPosition;
  isSticky.value = false;
}

onMounted(() => window.addEventListener("scroll", detectSticky));
onBeforeUnmount(() => window.removeEventListener("scroll", detectSticky));

function closeOptions(settings = true, filters = true, sorters = true, classes = true) {
  if (settings) closeSettings.value = true;
  if (filters) closeFilters.value = true;
  if (sorters) closeSorters.value = true;
  if (classes) closeClasses.value = true;
  setTimeout(() => {
    if (settings) closeSettings.value = false;
    if (filters) closeFilters.value = false;
    if (sorters) closeSorters.value = false;
    if (classes) closeClasses.value = false;
  }, 1);
}

watch(
  () => props.closeToolbar,
  (val) => {
    if (val) closeOptions();
  }
);
</script>

<style scoped></style>
