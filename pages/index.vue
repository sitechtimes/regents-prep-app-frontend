<template>
  <div class="flex flex-row justify-center items-center min-h-screen w-screen px-8 space-x-10" :class="{ 'bg-lime-300': isYoda }">
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
        <NuxtLink to="/login" class="flex items-center bg-green-accent border-2 border-black text-black text-2xl font-semibold px-6 py-2 rounded-full"> Login </NuxtLink>
      </div>
    </div>

    <!-- right side -->
    <div class="w-1/4">
      <img class="cat cursor-default" v-show="isYoda" src="/landingYoda.png" alt="A very short-haired black cat, edited to be green" title="The almighty Yoda." />
      <img
        ref="landingCatRef"
        @click="toggle"
        id="landing"
        class="cat z-50 cursor-help"
        :draggable="false"
        src="/landingCat.png"
        alt="Cat on a computer"
        title="This cat has some sort of hidden switch..?"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isYoda = ref(false);
const landingCatRef = ref<HTMLImageElement | undefined>();
let startingCount = 10; // min clicks to unleash yoda
let count = startingCount;
const clicks = ref(0);

function toggle() {
  if (isYoda.value || !landingCatRef.value) return;
  clicks.value++;
  if (Math.random() > 0.7) count--;
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
  landingCatRef.value.style.filter = "brightness(1)";
  // strength scales with how many clicks it took. have fun
  let vx = (clicks.value / startingCount) ** 2 * (clicks.value % 2 === 0 ? -1 : 1);
  let vy = -10;
  let iteration = 0;
  function physics(el: HTMLImageElement) {
    iteration++;
    el.style.left = Number(el.style.left.slice(0, -2)) + vx + "px";
    el.style.top = Number(el.style.top.slice(0, -2)) + vy + "px";
    el.style.rotate = Number((el.style.rotate ?? "0deg").slice(0, -3)) + vx + "deg";
    vy += 0.5;
    if (Number(el.style.top.slice(0, -2)) < window.innerHeight)
      setTimeout(() => {
        physics(el);
      }, 10);
    else el.remove();
  }
  physics(landingCatRef.value);
}

// for vitest
defineExpose({ isYoda, clicks, startingCount, toggle });
</script>

<style scoped>
.cat {
  @apply w-full object-cover;
  transform-origin: center;
  transition: none;
}

.cat#landing:active {
  filter: brightness(1.2);
}
</style>
