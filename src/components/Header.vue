<script setup lang="ts">
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

import Login from "../assets/pages/Login.vue";
import { useUserStore } from "../stores/user";
import type { User } from "../types/user";
import router from "../router";

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
  } catch {}
};

const handleLogout = () => {
  userStore.logout();
};

const goToDashboard = () => {
  router.push("/");
};

const goMerchantStore = () => {
  const username = userStore.currentUser?.username;
  if (username) {
    router.push(`/merchant/${username}/myStore`);
  } else {
    console.warn("User not logged in or username is missing");
  }
};

const goMyAccount = () => {
  const username = userStore.currentUser?.username;
  if (username) {
    router.push(`/account/${username}/myAccount`);
  } else {
    console.warn("User not logged in or username is missing");
  }
};
</script>

<template>
  <div class="header-container">
    <div class="top-header">
      <span class="logo" @click="goToDashboard"
        >NotReallySureWhatOrHowToSell</span
      >

      <div class="right">
        <template v-if="userStore.currentUser">
          <span
            >Hello, <strong>{{ userStore.currentUser.username }}</strong></span
          >
          <el-button class="logout-button" round @click="handleLogout"
            >Logout</el-button
          >
        </template>
        <template v-else>
          <el-button class="login-button" round @click="showLoginOverlay = true"
            >Log in</el-button
          >
          <el-button class="signup-button" round>Sign up for free</el-button>
        </template>
      </div>
    </div>

    <el-divider class="tagline" content-position="left"> </el-divider>

    <div
      v-if="showLoginOverlay && !userStore.currentUser"
      class="login-overlay"
      @click.self="handleOverlayClick"
    >
      <Login @login-success="handleLoginSuccess" />
    </div>

    <div class="menu">
      <el-button class="button" round @click="goToDashboard"
        >Dashboard</el-button
      >
      <el-button class="button" round @click="goMyAccount"
        >My Account</el-button
      >
      <el-button
        v-if="userStore.currentUser?.accType === 'Merchant'"
        class="button"
        round
        @click="goMerchantStore"
        >My Shop</el-button
      >
    </div>
  </div>
</template>

<style scoped>
.button {
  font-size: large;
  font-family: "Century Gothic";
  background-color: #ffffff;
  color: black;
  border: none;
  margin: 20px;

  transition: all 0.3s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
}

.menu {
  display: flex;
  align-items: center;
  height: 50px;
  border: none;
}

.header-container {
  margin-bottom: 0.25rem;
  background-color: white;
}

.top-header {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: xx-large;
  font-weight: 900;
  margin-top: 5px;
  color: #000000;

  cursor: pointer;
}

.right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.signup-button {
  color: white;
  background-color: #000000;
  border: none;
}

.login-button {
  border-color: #5d3d2e;
  color: #000000;
}

.logout-button {
  background-color: #9a3232;
  color: white;
  border: none;
  margin-left: 20px;
}

.tagline {
  background-color: transparent !important;
  color: #000000;
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

.header-container {
  background: linear-gradient(
    -45deg,
    #ff9a9e,
    #fad0c4,
    #fbc2eb,
    #a6c1ee,
    #84fab0,
    #8fd3f4,
    #cfd9df
  );
  background-size: 400% 400%;
  animation: randomGradient 90s ease infinite;
}

::v-deep(.el-divider) {
  border-top: 1px solid rgb(255, 255, 255);
  margin: 4px;
}
</style>
