<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import { login } from "../../modules/login";

const emit = defineEmits(["login-success"]);

const username = ref("");
const password = ref("");
const router = useRouter(); // Correct way to get router instance
const userStore = useUserStore(); // Call the function to get the store instance

const handleLogin = async () => {
  const user = await login(username.value, password.value);
  if (user) {
    await userStore.login(user); // store the user in Pinia
    ElMessage.success("Login successful!");
    router.push("/account");
    emit("login-success");
  } else {
    ElMessage.error("Invalid username or password.");
  }
};
</script>

<template>
  <div class="login-container">
    <el-card>
      <h3 style="margin-bottom: 10px">Login</h3>
      <el-input v-model="username" placeholder="Username" />
      <el-input
        v-model="password"
        type="password"
        placeholder="Password"
        style="margin-top: 10px"
      />
      <el-button type="primary" @click="handleLogin" style="margin-top: 15px"
        >Login</el-button
      >
    </el-card>

    <el-card style="justify-content: left">
      <strong>For debugging purposes, mock data:</strong>

      <div>
        <p><strong>Username:</strong> jlee_shop</p>
        <p><strong>Password:</strong> securepass</p>
        <p><strong>Type:</strong> Merchant</p>
        <p><strong>Register Date:</strong> 2021-07-19</p>
      </div>

      <div>
        <p><strong>Username:</strong> annasantos</p>
        <p><strong>Password:</strong> welcome123</p>
        <p><strong>Type:</strong> Customer</p>
        <p><strong>Register Date:</strong> 2023-01-11</p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  gap: 8px;
}

.el-card {
  max-width: 600px;
  max-height: 600px;
}
</style>
