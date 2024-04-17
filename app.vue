<script setup lang="ts">
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

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
