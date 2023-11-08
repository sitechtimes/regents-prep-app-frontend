<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();

onMounted(() => {
  console.log(userStore.user.username);
});
</script>

<template>
  <!-- Navigation -->
  <!--   <div class="h-[109px] bg-[#EAE9CA] shadow"></div> -->
  <!--   <div>
    <header>
      <nav class="h-[109px] bg-[#EAE9CA] shadow">
        <h1>Navbar</h1>
      </nav>
    </header>
  </div> -->
  <div>
    <h1>{{ userStore.user.fullname }}'s dashboard</h1>
  </div>
</template>

<style scoped></style>
