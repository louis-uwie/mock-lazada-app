<script lang="ts" setup>
import "./style.css";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElInput } from "element-plus";

import Login from "./assets/pages/Login.vue";
import { useUserStore } from "./stores/user";
import type { User } from "./types/user";

const router = useRouter();
const activeIndex = ref("1");
const input = ref("");
const userStore = useUserStore();

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

// When login succeeds:
// Assuming your Login component emits the logged-in user object
const handleLoginSuccess = (user: User) => {
  userStore.login(user);
};

const handleLogout = () => {
  userStore.logout();
};
</script>

<template>
  <div v-if="!userStore.currentUser" class="login-overlay">
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
          <el-button @click="handleLogout" type="text" class="logout-button">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                stroke="#374151"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
              />
            </svg>
          </el-button>
        </div>
      </div>

      <div v-if="userStore.currentUser" class="user-info">
        Hello, {{ userStore.currentUser.fname }}! <br />
        Welcome to Lazada !
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
}

.user-info {
  background-color: aliceblue;
  color: black;
  font-weight: 600;
  font-size: large;

  width: 20%;
  height: 100%;

  text-overflow: ellipsis; /* show "..." if text too long */
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

@media screen and (max-width: 768px) {
  .header {
    max-width: 100%; /* allow full width */
    flex-direction: column;
  }

  .user-info {
    width: 100%; /* make user-info take full width */
    max-width: 100%;
    margin-top: 8px; /* add some spacing below header items */
    justify-content: center; /* center contents on small screens */
  }

  .nav-bar {
    width: 100%; /* nav bar takes full width */
  }
}
</style>
