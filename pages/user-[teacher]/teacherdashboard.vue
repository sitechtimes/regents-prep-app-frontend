<script setup>
import { userState } from "~/stores/users";

const userStore = userState();

onMounted(() => {
  console.log(userStore.user.email);
});
definePageMeta({
  layout: 'dashboard',
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
    <h1> {{userStore.user.name}}'s dashboard</h1>
  </div>
</template>


<style scoped></style>
