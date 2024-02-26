<script setup lang="ts">
/* // Import the necessary functions and components
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();

// Create a ref to store the previous route path
const previousRoutePath = ref("");

// Use the router's navigation guard to track route changes
router.beforeEach((to: any, from: { fullPath: string; }, next: () => void) => {
  previousRoutePath.value = from.fullPath;
  next();
});

// Use onMounted to access the previous route path after the component is mounted
onMounted(() => {
  console.log("Previous route path:", previousRoutePath.value);
}); */
</script>

<template>
  <div class="bg-[#f1f0d6] h-screen w-screen">
    <NuxtLayout>
      <NuxtPage id="app" />
    </NuxtLayout>
  </div>
</template>
<!-- The 'app.vue' file is not necessary, as all the pages are housed within the 'pages' folder -->
