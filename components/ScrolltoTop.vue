<template>
  <div>
    <Transition name="slide-from-right">
      <button v-show="showScrollToTop" class="fixed bottom-6 right-6 z-10 rounded-lg bg-gray-200 px-2 py-2 text-lg shadow-lg" type="button" @click="scrollToTop">
        <img src="../public/ui/arrow-up.svg" class="h-6 w-6" />
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const showScrollToTop = ref(false);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function checkScroll() {
  const pageHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;

  showScrollToTop.value = pageHeight > viewportHeight * 2 && scrollTop > viewportHeight / 2;
}
onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
.slide-from-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-from-right-enter-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-from-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-from-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-from-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-from-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
