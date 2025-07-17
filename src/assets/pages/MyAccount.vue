<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
import type { User } from "../../types/user";
import { ElMessage } from "element-plus";
import "../../style.css";

const userStore = useUserStore();
const editingUser = ref<User | null>(
  userStore.currentUser ? { ...userStore.currentUser } : null
);

const handleUpdate = () => {
  if (editingUser.value) {
    userStore.login(editingUser.value); // reuse login to update user
    ElMessage.success("Account updated successfully!");
  }
};
</script>

<template>
  <div class="account-form fadeIn" v-if="editingUser">
    <h2 class="header">My Account</h2>
    <el-form label-position="top" :model="editingUser" class="form">
      <el-form-item label="Username">
        <el-input v-model="editingUser.username" />
      </el-form-item>

      <el-form-item label="First Name">
        <el-input v-model="editingUser.fname" />
      </el-form-item>

      <el-form-item label="Last Name">
        <el-input v-model="editingUser.lname" />
      </el-form-item>

      <el-form-item label="Home Address">
        <el-input v-model="editingUser.homeAddress" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="textarea" @click="handleUpdate">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div v-else>
    <p>Please log in to view your account.</p>
  </div>
</template>

<style scoped>
.header {
  color: white;
}

.account-form {
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem;
}

.form {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-width: 720px;

  box-shadow: 0px 16px 126px -17px rgba(255, 255, 255, 0.43);
}
</style>
