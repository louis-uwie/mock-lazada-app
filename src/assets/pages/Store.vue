<template>
  <div class="product-list">
    <el-card
      v-for="(product, index) in products"
      :key="index"
      class="product-card"
    >
      <img :src="product.img" alt="Product Image" class="product-image" />

      <template #footer>
        <div class="product-info">
          <strong>{{ product.name }}</strong
          ><br />
          Price: <b>₱{{ product.price.toFixed(2) }}</b
          ><br />
          Seller: {{ product.seller }}<br />
          Rating: {{ product.rating }} / 5<br />
          Category: {{ product.category }}
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { products } from "../../components/mock-products"; // adjust path as needed
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  justify-content: center;
}

.product-card {
  max-width: 240px;
  width: 100%;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  font-size: 14px;
  line-height: 1.4;
}
</style>
