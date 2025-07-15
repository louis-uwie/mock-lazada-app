<script setup lang="ts">
import "./style.css";
import QuickCheckOut from "./components/QuickCheckOut.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="fixed-header">
    <Header />
    <QuickCheckOut />
  </div>

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
  background-color: white;
  z-index: 1000;
}

.main-content {
  margin-top: 200px; /* Adjust based on Header + QuickCheckOut height */
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
