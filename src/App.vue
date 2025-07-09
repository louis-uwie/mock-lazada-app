<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElInput } from "element-plus";
import "./style.css";

const router = useRouter();
const activeIndex = ref("1");
const input = ref("");

const indexToRoute = {
  "1": "/",
  "2": "/store",
  "3": "/checkout",
};

const handleSelect = (key: string) => {
  activeIndex.value = key;
  const path = indexToRoute[key as "1" | "2" | "3"];
  if (path) {
    router.push(path);
  }
};
</script>

<template>
  <div class="nav-bar">
    <el-menu
      :active-index="activeIndex"
      class="el-menu-demo"
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
          placeholder="Please input"
          clearable
      /></el-menu-item>
    </el-menu>
  </div>

  <div class="main">
    <router-view />
  </div>
</template>

<style scoped>
.main {
  margin: 20px;
}
</style>
