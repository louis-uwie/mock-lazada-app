<template>
  <div v-if="userStore.currentUser" class="user-info">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="Name">
        {{ userStore.currentUser.fname }}
        {{ userStore.currentUser.lname }}
      </el-descriptions-item>
      <el-descriptions-item label="Username">
        {{ userStore.currentUser.username }}
      </el-descriptions-item>
      <el-descriptions-item label="Account Type">
        {{ userStore.currentUser.accType }}
      </el-descriptions-item>
      <el-descriptions-item label="Registered On">
        {{ formattedRegisterDate }}
      </el-descriptions-item>
      <el-descriptions-item label="Wallet">
        ₱{{ userStore.currentUser.wallet?.toFixed(2) ?? "0.00" }}
      </el-descriptions-item>
    </el-descriptions>
  </div>

  <div v-else class="user-info placeholder">
    <p>Please log in to see your details.</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const formattedRegisterDate = computed(() => {
  const date = userStore.currentUser?.registerDate;
  return date
    ? new Date(date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";
});
</script>

<style scoped>
.user-info {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

::v-deep(.el-descriptions) {
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
}

::v-deep(.el-descriptions__label) {
  width: 30% !important;
  flex: 0 0 20% !important;
  font-weight: 600;
}

::v-deep(.el-descriptions__content) {
  width: 70% !important;
  flex: 1 1 80% !important;
}
</style>
