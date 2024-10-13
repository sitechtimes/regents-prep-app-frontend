<template>
  <div class="flex flex-row justify-center items-center min-h-screen w-screen px-8 space-x-10">
    <!-- left side -->
    <div class="w-1/3">
      <div class="flex items-center mb-6">
        <div class="border-r-4 border-black h-32 mr-6"></div>
        <h1 class="font-bold text-5xl leading-relaxed flex flex-col">
          <span class="text-3xl">Welcome to the</span>
          SITHS Regents Prep App
        </h1>
      </div>
      <p class="text-2xl mt-4 mb-8">Don't fail your Regents.</p>
      <!-- buttons -->
      <div class="flex space-x-4">
        <NuxtLink to="/login?signup=1" class="flex items-center bg-green-accent text-black text-2xl font-semibold px-6 py-2 rounded-full"> Sign up </NuxtLink>
        <NuxtLink to="/login" class="flex items-center bg-transparent border-2 border-black text-black text-2xl font-semibold px-6 py-2 rounded-full"> Login </NuxtLink>
      </div>
    </div>

    <!-- right side -->
    <div class="w-1/4">
      <img class="cat cursor-default" v-show="isYoda" src="/landingYoda.png" alt="A very short-haired black cat, edited to be green" title="The almighty Yoda." />
      <img ref="landingCatRef" @click="toggle" class="cat z-50 cursor-help" src="/landingCat.png" alt="Cat on a computer" title="This cat has some sort of hidden switch..?" />
    </div>
  </div>
</template>

<script setup lang="ts">
const isYoda = ref(false);
const landingCatRef = ref<HTMLImageElement | undefined>();
let timeout: NodeJS.Timeout;
let count = 5; // min of 5 clicks to unleash yoda

function toggle() {
  if (!landingCatRef.value) return;
  if (isYoda.value) return;
  clearTimeout(timeout);
  landingCatRef.value.classList.add("clicked");
  timeout = setTimeout(() => {
    landingCatRef.value?.classList.remove("clicked");
  }, 50);
  if (Math.random() > 0.5) count--;
  if (count > 0) return;
  isYoda.value = !isYoda.value;
  bye();
}

function bye() {
  if (!landingCatRef.value) return;
  const rect = landingCatRef.value.getBoundingClientRect();
  landingCatRef.value.style.left = rect.left + "px";
  landingCatRef.value.style.top = rect.top + "px";
  landingCatRef.value.style.width = "24%";
  landingCatRef.value.style.position = "fixed";
  let vx = (Math.random() - 0.5) * 8;
  let vy = -10;
  let iteration = 0;
  function physics(el: HTMLImageElement) {
    iteration++;
    el.style.left = Number(el.style.left.slice(0, -2)) + vx + "px";
    el.style.top = Number(el.style.top.slice(0, -2)) + vy + "px";
    el.style.rotate = Number(el.style.rotate.slice(0, -3)) + vx + "deg";
    vy += 0.5;
    if (Number(el.style.top.slice(0, -2)) < window.innerHeight)
      setTimeout(() => {
        physics(el);
      }, 10);
    else el.remove();
  }
  physics(landingCatRef.value);
}
</script>

<style scoped>
body {
  overflow-y: hidden !important;
}

.cat {
  @apply w-full object-cover;
  transform-origin: center;
}

.clicked {
  filter: brightness(1.5);
}
</style>
