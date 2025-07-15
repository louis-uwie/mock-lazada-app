<template>
  <el-table :data="userOrders" stripe border style="width: 100%">
    <el-table-column prop="id" label="Order ID" width="220" />

    <el-table-column label="Items">
      <template #default="{ row }">
        <li v-for="item in row.items" :key="item.productId" style="margin: 4px">
          {{ item.quantity }} × {{ getProductName(item.productId) }}
          <strong>( ₱{{ item.price.toFixed(2) }} )</strong>
        </li>
      </template>
    </el-table-column>

    <el-table-column prop="totalPrice" label="Total" width="140">
      <template #default="{ row }"> ₱{{ row.totalPrice.toFixed(2) }} </template>
    </el-table-column>

    <el-table-column prop="status" label="Status" width="120" />
  </el-table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../../stores/user";
import { useOrderStore } from "../../stores/orders";
import { useProductStore } from "../../stores/product";

const userStore = useUserStore();
const orderStore = useOrderStore();
const productStore = useProductStore();

const user = computed(() => userStore.currentUser);

const userOrders = computed(() => {
  if (!user.value) return [];
  return orderStore.getOrdersByUser(user.value.userId);
});

function getProductName(productId: string): string {
  const product = productStore.getProductById(productId);
  return product?.name ?? "Unknown Product";
}
</script>

<style scoped>
.orders-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fdfdfd;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.empty-orders {
  text-align: center;
  margin-top: 5rem;
  font-size: 1.2rem;
}
</style>
