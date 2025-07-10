<script lang="ts" setup>
import "./style.css";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElInput } from "element-plus";

import Login from "./assets/pages/Login.vue";
import { useUserStore } from "./stores/user";
import type { User } from "./types/user";

import { ElMessageBox } from "element-plus";

const router = useRouter();
const activeIndex = ref("1");
const input = ref("");
const userStore = useUserStore();
const showLoginOverlay = ref(false);

const indexToRoute = {
  "1": "/",
  "2": "/store",
  "3": "/checkout",
};

const handleSelect = (key: string) => {
  activeIndex.value = key;
  const path = indexToRoute[key as keyof typeof indexToRoute];
  if (path) router.push(path);
};

const handleLoginSuccess = (user: User) => {
  userStore.login(user);
  showLoginOverlay.value = false;
};

const handleLogout = () => {
  userStore.logout();
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
</script>

<template>
  <div
    v-if="showLoginOverlay && !userStore.currentUser"
    class="login-overlay"
    @click.self="handleOverlayClick"
  >
    <Login @login-success="handleLoginSuccess" />
  </div>

  <div class="main">
    <header class="header">
      <div class="nav-wrapper">
        <el-menu
          :default-active="activeIndex"
          class="nav-bar"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">Dashboard</el-menu-item>
          <el-menu-item index="2">Store</el-menu-item>
          <el-menu-item index="3">Check Out</el-menu-item>
          <el-menu-item index="4">
            <el-input
              v-model="input"
              style="width: 240px"
              placeholder="Search"
              clearable
            />
          </el-menu-item>
        </el-menu>

        <div class="nav-right">
          <!-- 🔹 Log out button -->
          <el-button
            v-if="userStore.currentUser"
            @click="handleLogout"
            type="text"
            class="logout-button"
          >
            Log Out
          </el-button>

          <!-- 🔹 Show login button -->
          <el-button
            v-else
            type="primary"
            class="login-button"
            @click="showLoginOverlay = true"
          >
            Log In
          </el-button>
        </div>
      </div>

      <!-- Welcome message -->
      <div v-if="userStore.currentUser" class="user-info">
        Hello, {{ userStore.currentUser.fname }}! <br />
        Welcome to Lazada!
      </div>
    </header>

    <router-view />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.nav-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  background-color: white;
  overflow-x: auto;
}

.nav-bar {
  flex: 1 1 auto;
  min-width: 0;
  background-color: white;
  white-space: nowrap;
}

.nav-right {
  margin-right: 20px;
}

.header {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
}

.user-info {
  color: black;
  font-weight: 600;
  font-size: large;
  width: 20%;
  height: 100%;
  text-overflow: ellipsis;
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

/* Mobile styles */
@media screen and (max-width: 768px) {
  .header {
    max-width: 100%;
    flex-direction: column;
  }

  .user-info {
    width: 100%;
    max-width: 100%;
    margin-top: 8px;
    justify-content: center;
  }

  .nav-bar {
    width: 100%;
  }
}
</style>
