<template>
  <div class="product-list">
    <router-link
      v-for="(product, index) in products"
      :key="index"
      :to="`/product/${product.productId}`"
      class="product-link"
    >
      <el-card class="product-card" shadow="hover">
        <!-- <img :src="product.img" alt="Product Image" class="product-image" /> -->
        <img
          src="../images/europeana-kWrE1KDiR48-unsplash.jpg"
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
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { products } from "../../components/mock-products";
// import { useProductStore } from "../../stores/product";
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  justify-content: center;
}

.product-link {
  text-decoration: none;
  color: inherit;
  max-width: 360px;
  width: 100%;
}

.product-card {
  transition: transform 0.2s;
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
