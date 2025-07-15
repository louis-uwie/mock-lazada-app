import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

import type { Order, OrderItem } from "../types/order";

import { useUserStore } from "./user";
import { useProductStore } from "./product";

function loadOrdersFromLocalStorage(): Order[] {
  const saved = localStorage.getItem("orders");
  return saved ? JSON.parse(saved) : [];
}

function saveOrdersToLocalStorage(orders: Order[]) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: loadOrdersFromLocalStorage(),
  }),

  getters: {
    getOrdersByUser: (state) => (userId: string) => {
      return state.orders.filter((order) => order.user.userId === userId);
    },
  },

  actions: {
    purchaseItem(productId: string, quantity = 1) {
      const userStore = useUserStore();
      const productStore = useProductStore();

      const user = userStore.currentUser;
      if (!user) throw new Error("No logged in user");

      // Use product store getter:
      const product = productStore.getProductById(productId);
      if (!product) throw new Error("Product not found");
      if (product.stocks < quantity) throw new Error("Insufficient stock");

      productStore.reduceStock(productId, quantity);

      const item: OrderItem = {
        productId: product.productId,
        quantity,
        price: product.price,
        seller: product.seller,
      };

      const totalPrice = product.price * quantity;

      const newOrder: Order = {
        id: uuidv4(),
        user,
        items: [item],
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      this.orders.push(newOrder);
      saveOrdersToLocalStorage(this.orders);

      return newOrder;
    },
  },
});
