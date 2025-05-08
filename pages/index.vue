<template>
  <div
    class="flex min-h-screen w-screen flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0 sm:space-x-10 sm:px-12 md:px-32 lg:px-52 xl:px-72 2xl:px-96"
    :class="{ 'bg-lime-300': isYoda }"
  >
    <!-- left side -->
    <div class="flex flex-col items-center justify-center sm:block sm:grow">
      <div class="flex items-center sm:mb-6">
        <div class="h-32 w-1"></div>
        <h1 class="flex flex-col text-center text-3xl font-bold leading-relaxed sm:text-left xl:text-4xl 2xl:text-5xl">
          <span class="text-2xl 2xl:text-3xl">Welcome to the</span>
          SITHS Regents Prep App
        </h1>
      </div>
      <p class="mb-2 mt-4 text-2xl sm:mb-8">Don't fail your Regents.</p>
      <!-- buttons -->
      <div class="flex space-x-4">
        <NuxtLink to="/login" class="flex items-center rounded-xl bg-[var(--primary)] px-6 py-2 text-2xl text-[var(--text-color)] hover:brightness-[0.85] hover:dark:brightness-125"> Login </NuxtLink>
      </div>
    </div>

    <!-- right side -->
    <div class="w-1/4">
      <img v-show="isYoda" class="cat cursor-default" src="/landingYoda.png" alt="A very short-haired black cat, edited to be green" title="The almighty Yoda." />
      <img
        id="landing"
        ref="landingCatRef"
        class="cat z-50 cursor-help"
        :draggable="false"
        src="/landingCat.png"
        alt="Cat on a computer"
        title="This cat has some sort of hidden switch..?"
        @click="toggle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isYoda = ref(false);
const landingCatRef = useTemplateRef("landingCatRef");
const startingCount = 10; // min clicks to unleash yoda
let count = startingCount;
const clicks = ref(0);

function bye() {
  if (!landingCatRef.value) return;
  const rect = landingCatRef.value.getBoundingClientRect();
  landingCatRef.value.style.left = `${rect.left}px`;
  landingCatRef.value.style.top = `${rect.top}px`;
  landingCatRef.value.style.width = "24%";
  landingCatRef.value.style.position = "fixed";
  landingCatRef.value.style.filter = "brightness(1)";
  // strength scales with how many clicks it took. have fun
  const vx = (clicks.value / startingCount) ** 2 * (clicks.value % 2 === 0 ? -1 : 1);
  let vy = -10;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let iteration = 0;
  function physics(el: HTMLImageElement) {
    iteration++;
    el.style.left = `${Number(el.style.left.slice(0, -2)) + vx}px`;
    el.style.top = `${Number(el.style.top.slice(0, -2)) + vy}px`;
    el.style.rotate = `${Number((el.style.rotate ?? "0deg").slice(0, -3)) + vx}deg`;
    vy += 0.5;
    if (Number(el.style.top.slice(0, -2)) < window.innerHeight)
      setTimeout(() => {
        physics(el);
      }, 10);
    else el.remove();
  }
  physics(landingCatRef.value);
}

function toggle() {
  if (isYoda.value || !landingCatRef.value) return;
  clicks.value++;
  if (Math.random() > 0.7) count--;
  if (count > 0) return;
  isYoda.value = !isYoda.value;
  bye();
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
