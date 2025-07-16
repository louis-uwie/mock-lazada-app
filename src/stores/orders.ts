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
    orders: loadOrdersFromLocalStorage() as Order[],
  }),

  getters: {
    getOrdersByUser: (state) => (userId: string) => {
      return state.orders.filter((order) => order.user.userId === userId);
    },
  },

  actions: {
    /**
     * Checkout method: Takes the current cart items and creates an order
     */
    checkoutCart(items: OrderItem[], totalPrice: number) {
      const userStore = useUserStore();
      const productStore = useProductStore();
      const user = userStore.currentUser;

      if (!user) throw new Error("No logged in user");
      if (!items.length) throw new Error("Cart is empty");

      // Reduce stock for each item
      for (const item of items) {
        productStore.reduceStock(item.productId, item.quantity);
      }

      const newOrder: Order = {
        id: uuidv4(),
        user,
        items,
        totalPrice,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      this.orders.push(newOrder);
      saveOrdersToLocalStorage(this.orders);

      return newOrder;
    },

    cancelOrder(orderId: string) {
      const orderIndex = this.orders.findIndex((order) => order.id === orderId);
      if (orderIndex === -1) throw new Error("Order not found");

      const order = this.orders[orderIndex];
      if (order.status !== "pending")
        throw new Error("Only pending orders can be cancelled");

      // Restore stock
      const productStore = useProductStore();
      for (const item of order.items) {
        productStore.increaseStock(item.productId, item.quantity);
      }

      this.orders[orderIndex].status = "cancelled";
      saveOrdersToLocalStorage(this.orders);
    },
  },
});
