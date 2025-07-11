<template>
  <div v-if="userStore.currentUser" class="user-info">
    Hello, {{ userStore.currentUser.fname }}!
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>
import { useUserStore } from "../stores/user";
// import type { User } from "../types/user";

const userStore = useUserStore();
</script>
