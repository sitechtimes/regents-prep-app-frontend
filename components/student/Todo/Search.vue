<template>
  <div
    class="flex h-9 w-36 items-center justify-center rounded-full border border-neutral-300 bg-white p-3 transition duration-300 focus:border-neutral-600/50 focus:outline focus:outline-1 focus:outline-neutral-600/50 lg:w-72 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
  >
    <span class="">
      <img class="size-5 shrink-0 transition duration-300 dark:invert" src="/ui/search.svg" aria-hidden="true" />
    </span>
    <input
      v-model="search"
      type="text"
      class="search-input ml-2 w-full grow rounded-e-full text-left text-black transition duration-500 placeholder:transition placeholder:duration-500 dark:text-white dark:placeholder:text-neutral-300"
      placeholder="Search"
    />
    <div class="du-tooltip p-0" data-tip="Clear" :class="search ? 'visible' : 'invisible'">
      <button tabindex="-1" class="fo-btn fo-btn-circle fo-btn-text rounded-full" type="button" @click="search = ''">
        <img class="size-5 dark:invert" src="/ui/close.svg" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ search: [string] }>();

const search = ref("");
watch(search, (value) => emit("search", value));
</script>

<style scoped></style>
