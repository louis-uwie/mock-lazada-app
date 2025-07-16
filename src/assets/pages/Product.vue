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
        type="success"
        @click="addToCart"
        :disabled="quantity > product.stocks"
      >
        Add to Cart
      </el-button>

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
import { ElMessage } from "element-plus";

import { useUserStore } from "../../stores/user";
import { useProductStore } from "../../stores/product";
import { useCartStore } from "../../stores/carts";
import { useOrderStore } from "../../stores/orders";

import type { Product } from "../../types/product";
import { products } from "../../components/mock-products";

const route = useRoute();
const userStore = useUserStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const productId = route.params.id as string;
const product: Product | undefined = products.find(
  (p) => p.productId === productId
);

const quantity = ref(1);

const addToCart = () => {
  const user = userStore.currentUser;
  if (!user || !product) {
    ElMessage.error("Please log in to add to cart.");
    return;
  }

  try {
    cartStore.addItemToCart(product.productId, quantity.value);
    ElMessage.success(`${product.name} added to cart!`);
  } catch (err) {
    ElMessage.error((err as Error).message);
  }
};

const buyNow = () => {
  const user = userStore.currentUser;
  if (!user || !product) {
    ElMessage.error("Please log in to purchase.");
    return;
  }

  try {
    // 1. Add to cart
    cartStore.addItemToCart(product.productId, quantity.value);

    // 2. Checkout entire cart
    const cartItems = cartStore.getItems(); // array of OrderItem
    const total = cartStore.getTotalPrice();

    orderStore.checkoutCart(cartItems, total);

    // 3. Clear cart
    cartStore.clearCart();

    ElMessage.success(`Purchased ${quantity.value} of ${product.name}`);
  } catch (err) {
    ElMessage.error((err as Error).message);
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

.purchase-section {
  display: flex;
  gap: 12px;
  margin-top: 1rem;
}
</style>
