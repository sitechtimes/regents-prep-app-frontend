<template>
  <Teleport to="body">
    <Transition name="menu-scale">
      <div v-if="showModal" class="fixed left-0 top-0 z-30 flex min-h-screen w-screen items-center justify-center bg-black/45" @click="closeModal">
        <div class="menu bg-body w-125 flex flex-col items-center justify-center gap-4 rounded-xl p-6" @click.stop>
          <div class="flex w-full items-start justify-between gap-2">
            <div class="flex flex-col items-start justify-center">
              <h1 id="not-found" class="text-3xl font-semibold">Sorry!</h1>
              <p class="text-neutral-700">We couldn't find the {{ message }} you were asking for.</p>
              <p class="mt-2 text-lg font-medium">We'll keep looking!</p>
            </div>

            <button class="active:scale-90" type="button">
              <img class="spin size-20" src="/siths.png" aria-hidden="true" />
            </button>
          </div>

          <button class="ms-auto rounded-xl border-2 border-neutral-400 px-6 py-1.5 transition hover:border-green-400 hover:bg-green-300 active:scale-95" type="button" @click="closeModal">
            Continue
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  showModal: boolean;
  message: "class" | "assignment";
  userType: "student" | "teacher";
}>();

const router = useRouter();

function closeModal() {
  void router.replace(`/${props.userType}/dashboard`);
}
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 4s linear infinite;
}

.menu-scale-enter-active,
.menu-scale-leave-active {
  transition: all 0.2s ease-in-out;
}

.menu-scale-enter-from,
.menu-scale-leave-to {
  opacity: 0;
}

.menu-scale-enter-from .menu,
.menu-scale-leave-to .menu {
  transform: scale(0.75);
}
</style>
