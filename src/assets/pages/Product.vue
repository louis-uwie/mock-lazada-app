<template>
  <div v-if="product" class="product-detail">
    <img :src="product.img" :alt="product.name" class="product-image" />
    <h2>{{ product.name }}</h2>
    <p><strong>Seller:</strong> {{ product.seller.username }}</p>
    <p><strong>Category:</strong> {{ product.category }}</p>
    <p><strong>Stocks:</strong> {{ product.stocks }}</p>
    <p><strong>Price:</strong> ₱{{ product.price.toFixed(2) }}</p>
    <p>{{ product.description }}</p>

    <div class="purchase-section">
      <el-input-number
        v-model="quantity"
        :min="1"
        :max="product.stocks"
        size="small"
        label="Quantity"
      />
      <el-button
        type="primary"
        @click="buyNow"
        :disabled="quantity > product.stocks"
      >
        Buy Now
      </el-button>
    </div>
  </div>

  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { products } from "../../components/mock-products";
import { useUserStore } from "../../stores/user";
import { useProductStore } from "../../stores/product";
import { useOrderStore } from "../../stores/orders";
import type { Product } from "../../types/product";
import type { OrderItem } from "../../types/order";

const route = useRoute();

const productId = route.params.id as string;
const productStore = useProductStore();

const product: Product | undefined = products.find(
  (p) => p.productId === productId
);

const quantity = ref(1);

const buyNow = () => {
  const userStore = useUserStore();
  const orderStore = useOrderStore();

  // const username = userStore.currentUser?.username;
  const user = userStore.currentUser;

  if (!product || product.stocks < quantity.value || !user) {
    alert("Invalid purchase.");
    return;
  }

  try {
    orderStore.purchaseItem(product.productId, quantity.value);
    alert(`You bought ${quantity.value} item(s) of ${product.name}!`);
  } catch (err) {
    alert((err as Error).message);
  }
};
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
