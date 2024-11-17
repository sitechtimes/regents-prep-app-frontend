<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
    <div class="p-6 max-w-md mx-auto bg-[var(--bg-color)] flex flex-col items-center">
      <h1
        class="text-8xl md:text-[10rem] mb leading-none font-extrabold text-[var(--text-color)] text-center select-none"
        @click="counter--">404</h1>
      <p class="text-lg text-[var(--text-color)] text-center mb-4 select-none">Sorry, we couldn't find the page you were
        looking for.</p>
      <NuxtLink to="/"
        class="px-8 py-2 text-xl font-medium rounded-full bg-[var(--primary)] brightness-75 text-[var(--text-color)] hover:brightness-100 transition">
        Back to Home</NuxtLink>
    </div>
    <div>
      <img v-for="yoda in yodas" :key="yoda.created" class="fixed select-none pointer-events-none" :draggable="false"
        :style="{
          left: yoda.x + 'px',
          top: yoda.y + 'px',
          transform: `translate(-50%, -55%) rotate(${yoda.angle}deg) scale(0.2)`,
          filter: `brightness(${yoda.influence * 0.5 + 0.5})`,
          zIndex: Math.ceil(yoda.influence * 100)
        }" src="/landingYoda.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
const counter = ref(5);

const yodas: Yoda[] = reactive([]);
type Yoda = {
  x: number;
  vx: number;
  y: number;
  vy: number;
  angle: number;
  created: number;
  influence: number;
};

let movementX = 0;
let movementY = 0;
function spawnYoda(e: MouseEvent) {
  movementX = e.movementX;
  movementY = e.movementY;
  cooldown = 5;
  yodas.push({
    x: e.screenX,
    vx: movementX * 0.01,
    y: e.screenY,
    vy: movementY * 0.01,
    angle: 0,
    created: Date.now(),
    influence: 0
  });
}

let cooldown = 5;
let interval: NodeJS.Timeout;

watch(counter, () => {
  if (counter.value > -1 || interval || matchMedia("(pointer:coarse)").matches) return;
  alert("The horde is coming...");

  function update() {
    const explode: number[] = [];
    let i = 0;
    const now = Date.now();
    yodas.forEach((yoda) => {
      yoda.x += yoda.vx;
      yoda.y += yoda.vy;
      yoda.influence = Math.max(0, 1 - (now - yoda.created) / 1000);
      yoda.vx += movementX * yoda.influence * 0.04;
      yoda.vy += movementY * yoda.influence * 0.04;
      if (yoda.x < -window.innerWidth || yoda.x > 2 * window.innerWidth || yoda.y < -window.innerHeight || yoda.y > 2 * window.innerHeight) explode.push(i);
      yoda.angle += yoda.vx * yoda.vy * 0.1;
      i++;
    });
    for (var j = explode.length - 1; j >= 0; j--) yodas.splice(explode[j], 1);
  }

  interval = setInterval(update, 10);

  document.addEventListener("mousemove", (event) => {
    cooldown--;
    if (cooldown < 1) spawnYoda(event);
  });
});

// for vitest
defineExpose({ counter, yodas, spawnYoda });
</script>

<style scoped>
img {
  transition: none;
}
</style>
