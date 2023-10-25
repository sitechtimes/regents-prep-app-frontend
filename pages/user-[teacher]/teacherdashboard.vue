<script setup>
import { userState } from "~/stores/users";

const userStore = userState();

onMounted(() =>{
  console.log(userStore.user.email)  
})

</script>

<template>
  <div>
    <h1>Welcome {{ $route.params.teacher }}</h1>
  </div>
</template>


<style lang="scss" scoped></style>
