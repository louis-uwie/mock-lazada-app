<script setup lang="ts">
import "./style.css";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

import Navigation from "./components/Navigation.vue";
import Login from "./assets/pages/Login.vue";
import QuickCheckOut from "./components/QuickCheckOut.vue";

import { useUserStore } from "./stores/user";
import type { User } from "./types/user";

const userStore = useUserStore();
const showLoginOverlay = ref(false);

const handleLoginSuccess = (user: User) => {
  userStore.login(user);
  showLoginOverlay.value = false;
};

const handleOverlayClick = async () => {
  try {
    await ElMessageBox.confirm(
      "Are you sure you want to cancel login?",
      "Cancel Log In?",
      {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      }
    );
    showLoginOverlay.value = false;
  } catch {
    // user canceled
  }
};
</script>

<template>
  <Navigation @show-login="showLoginOverlay = true" />
  <QuickCheckOut />

  <div class="main">
    <router-view />
  </div>

  <div
    v-if="showLoginOverlay && !userStore.currentUser"
    class="login-overlay"
    @click.self="handleOverlayClick"
  >
    <Login @login-success="handleLoginSuccess" />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(92, 92, 92, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
