<script setup lang="ts">
import "./style.css";
import QuickCart from "./components/QuickCart.vue";
import Header from "./components/Header.vue";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();
</script>

<template>
  <div class="fixed-header">
    <Header />
  </div>

  <!-- Only show QuickCart if user is logged in -->
  <QuickCart v-if="userStore.currentUser" />

  <div class="main-content">
    <router-view />
  </div>
</template>

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  min-width: 570px;
}

.main-content {
  margin-top: 200px;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  align-items: center;
  min-height: 100vh;
}
</style>
