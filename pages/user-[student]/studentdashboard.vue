<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();

onMounted(() => {
  console.log(userStore.user.username);
});
</script>

<template>
  <div>
    <h1>Welcome {{ userStore.user.username }}</h1>
  </div>
</template>

<style lang="scss" scoped></style>
