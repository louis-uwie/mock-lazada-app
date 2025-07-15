<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();
const activeIndex = ref("1");

const emit = defineEmits(["show-login"]);

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
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="nav-bar"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">Dashboard</el-menu-item>
    <el-menu-item index="2">Store</el-menu-item>
    <el-menu-item index="3">Check Out</el-menu-item>
  </el-menu>
</template>

<style scoped>
.nav-bar {
  width: 100%;
  display: flex;
  justify-content: row;
  align-items: center;
  padding: 0 16px;
  background-color: transparent;
}
.logout-button,
.login-button {
  margin-left: 16px;
}
</style>
