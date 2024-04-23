<script setup lang="ts">
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: persistedState.sessionStorage,
  })
);

const userStore = userState();
const classDetails = userClass();
const userQuestions = useQuestions();
</script>

<template>
  <div class="bg-bg-reg h-screen w-screen">
    <NuxtLayout>
      <NuxtPage id="app" />
    </NuxtLayout>
  </div>
</template>
<!-- The 'app.vue' file is not necessary, as all the pages are housed within the 'pages' folder -->
