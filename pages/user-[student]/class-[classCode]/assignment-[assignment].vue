<script setup lang="ts">
import { userState } from "~/stores/users";
const route = useRoute();

definePageMeta({
  middleware: () => {
    const userStore = userState();
    userStore.studentCheck();
  },
});
</script>

<template>
  <h1>{{ route.params.assignment }}</h1>
</template>

<style></style>
