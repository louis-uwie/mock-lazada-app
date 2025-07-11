<template>
  <div v-if="product" class="product-detail">
    <img :src="product.img" :alt="product.name" class="product-image" />
    <h2>{{ product.name }}</h2>
    <p><strong>Seller:</strong> {{ product.seller }}</p>
    <p><strong>Category:</strong> {{ product.category }}</p>
    <p><strong>Stocks:</strong> {{ product.stocks }}</p>
    <p><strong>Rating:</strong> {{ product.rating }}/5</p>
    <p><strong>Price:</strong> ₱{{ product.price.toFixed(2) }}</p>
    <p>{{ product.description }}</p>
  </div>

  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { products } from "../../components/mock-products";
import type { Product } from "../../types/product";

// Get the route parameter
const route = useRoute();
const productId = route.params.id as string;

// Find the matching product
const product: Product | undefined = products.find((p) => p.id === productId);
</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 2rem auto;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 8px;
  background: #f9f9f9;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 1rem;
}
</style>
