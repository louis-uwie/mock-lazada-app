<template>
  <el-card class="product-card" shadow="hover">
    <img
      src="../assets/images/europeana-kWrE1KDiR48-unsplash.jpg"
      class="product-image"
    />
    <template #footer>
      <div class="product-info">
        <strong>{{ product.name }}</strong
        ><br />
        Price: <b>₱{{ product.price.toFixed(2) }}</b
        ><br />
        Seller: {{ product.seller.username }}<br />
        Category: {{ product.category }}
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import type { Product } from "../types/product"; // make sure you have this type

defineProps<{
  product: Product;
}>();
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease-in-out;
}
.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  font-size: 16px;
  line-height: 1.4;
}
</style>
