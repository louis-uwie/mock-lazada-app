<template>
  <div class="cart-container">
    <div v-if="cartItems.length" class="cart-content">
      <el-table :data="cartItems" stripe border style="width: 100%">
        <el-table-column label="Product" align="center">
          <template #default="{ row }">
            <strong>{{ row.name }}</strong>
          </template>
        </el-table-column>

        <el-table-column label="Price" align="center" width="120">
          <template #default="{ row }"> ₱{{ row.price.toFixed(2) }} </template>
        </el-table-column>

        <el-table-column label="Quantity" align="center" width="160">
          <template #default="{ row }">
            <el-input-number
              v-model="row.quantity"
              :min="1"
              @change="updateQuantity(row.productId, row.quantity)"
            />
          </template>
        </el-table-column>

        <el-table-column label="Subtotal" align="center" width="140">
          <template #default="{ row }">
            ₱{{ (row.price * row.quantity).toFixed(2) }}
          </template>
        </el-table-column>

        <el-table-column label="Actions" align="center" width="140">
          <template #default="{ row }">
            <el-button
              size="small"
              type="danger"
              @click="removeItem(row.productId)"
            >
              Remove
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="cart-footer">
        <div class="total">Total: ₱{{ totalPrice.toFixed(2) }}</div>
        <el-button type="primary" @click="checkout">Checkout</el-button>
      </div>
    </div>

    <div v-else class="empty-cart">Your cart is empty.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import { useCartStore } from "../../stores/carts";
import { useOrderStore } from "../../stores/orders";
import { useProductStore } from "../../stores/product";
import { useUserStore } from "../../stores/user";

const cartStore = useCartStore();
const orderStore = useOrderStore();
const productStore = useProductStore();
const userStore = useUserStore();

// Enrich cart items with product info
const cartItems = computed(() =>
  cartStore.getItems.map((item) => {
    const product = productStore.getProductById(item.productId);
    return {
      ...item,
      price: product?.price ?? 0,
      name: product?.name ?? "Unknown Product",
    };
  })
);

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

function updateQuantity(productId: string, newQty: number) {
  try {
    cartStore.updateQuantity(productId, newQty);
  } catch (err) {
    ElMessage.error((err as Error).message);
  }
}

function removeItem(productId: string) {
  ElMessageBox.confirm("Remove this item from your cart?", "Confirm Removal", {
    confirmButtonText: "Remove",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      cartStore.removeItem(productId);
      ElMessage.success("Item removed from cart.");
    })
    .catch(() => {});
}

function checkout() {
  const user = userStore.currentUser;
  if (!user) {
    ElMessage.error("You must be logged in to checkout.");
    return;
  }

  try {
    const itemsForOrder = cartItems.value.map(
      ({ productId, quantity, price }) => {
        const product = productStore.getProductById(productId);
        if (!product) throw new Error(`Product not found: ${productId}`);

        return {
          productId,
          quantity,
          price,
          seller: product.seller,
        };
      }
    );

    const total = totalPrice.value;

    if (!itemsForOrder.length) {
      ElMessage.warning("Cart is empty.");
      return;
    }

    orderStore.checkoutCart(itemsForOrder, total);
    cartStore.clearCart();

    ElMessage.success("Checkout complete!");
  } catch (err) {
    ElMessage.error((err as Error).message);
  }
}
</script>

<style scoped>
.cart-container {
  min-width: 1080px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fdfdfd;
  border-radius: 8px;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  color: srgb(0, 0, 0);
  font-size: 1.5rem;
  font-style: italic;
  background: transparent;
}
</style>
