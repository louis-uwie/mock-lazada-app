<template>
  <div v-if="userStore.currentUser">
    <div class="parent">
      <div class="div1">
        <section class="user-info">
          <el-descriptions class="user-descriptions" :column="1" border>
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
        </section>
      </div>
      <div class="div2">
        <el-avatar shape="square" :src="catAvatar" :size="200" />
      </div>
    </div>
  </div>

  <div v-else class="user-info placeholder">
    <p>Please log in to see your details.</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useUserStore } from "../stores/user";
import catAvatar from "../assets/images/catpfp.jpg";

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
.parent {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* No need to force 100% width here */
.user-descriptions {
  min-width: 600px;
}

.user-info {
  margin: 0 auto;
}

/* Avatar wrapper should also not be forced to 100% width */
.div1,
.div2 {
  display: flex;
  justify-content: center;
  align-items: center;
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

.placeholder {
  text-align: center;
  font-size: 1rem;
  color: #666;
}
</style>
