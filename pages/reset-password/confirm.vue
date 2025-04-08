<template>
  <div class="flex min-h-screen w-screen flex-col items-center justify-center py-12">
    <h1 class="text-4xl font-bold">Set New Password</h1>
    <div class="mt-2 flex flex-col items-center rounded-2xl p-6">
      <form class="flex flex-col gap-4" @submit.prevent="confirmResetPassword">
        <input v-model="newPassword1" type="password" placeholder="New Password" required class="rounded-lg bg-gray-accent px-4 py-3 text-neutral-900" />
        <input v-model="newPassword2" type="password" placeholder="Confirm New Password" required class="rounded-lg bg-gray-accent px-4 py-3 text-neutral-900" />
        <p v-if="notMatching" class="mt-4 text-red-500">Passwords do not match</p>
        <button type="submit" class="mt-4 w-80 rounded-lg bg-green-accent py-2">
          <span v-if="loading" class="loading du-loading du-loading-sm"></span>
          <span v-else>Reset Password</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const uid = route.query.uid as string;
const token = route.query.token as string;

const newPassword1 = ref("");
const newPassword2 = ref("");
const loading = ref(false);
const notMatching = ref(false);

const confirmResetPassword = async () => {
  if (newPassword1.value !== newPassword2.value) {
    notMatching.value = true;
    return;
  }

  loading.value = true;
  try {
    const response = await fetch("/auth/password/reset/confirm/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, token, new_password1: newPassword1.value, new_password2: newPassword2.value })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to reset password");
    }

    alert("Password reset successful!");
    router.push("/login");
  } catch (error) {
    const errorMessage = (error as Error).message || "Something went wrong.";
    console.error("Reset error:", errorMessage);
    alert(errorMessage);
  } finally {
    loading.value = false;
  }
};
</script>
