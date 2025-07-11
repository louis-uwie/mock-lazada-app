<template>
  <div class="container">
    <div class="profile-banner">
      <el-card class="profile-card">
        Viewing store for: {{ username }}
      </el-card>
    </div>
    <div class="my-products">
      <!-- You can fetch and display products for this seller here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const username = route.params.username as string;

onMounted(() => {
  if (!username && userStore.currentUser) {
    router.push(`/accountg/${userStore.currentUser.username}`);
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
}
.profile-banner {
  margin-bottom: 20px;
}
.profile-card {
  font-size: 20px;
  font-weight: bold;
}
</style>
