import { defineStore } from "pinia";
import { useUserStore } from "./user";
import type { Cart, CartItem } from "../types/cart";
import { useProductStore } from "./product";

const CART_STORAGE_KEY = "user-cart";

function loadCart(): Cart | null {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function saveCart(cart: Cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: loadCart() as Cart | null,
  }),

  getters: {
    itemCount: (state) =>
      state.cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,

    getItems: (state) => state.cart?.items ?? [],

    getTotalPrice: (state) => {
      const productStore = useProductStore();
      if (!state.cart) return 0;
      return state.cart.items.reduce((total, item) => {
        const product = productStore.getProductById(item.productId);
        return total + (product ? product.price * item.quantity : 0);
      }, 0);
    },
  },

  actions: {
    initializeCart() {
      const userStore = useUserStore();
      const user = userStore.currentUser;
      if (!user) throw new Error("No logged in user");

      this.cart = {
        userId: user.userId,
        items: [],
        updatedAt: new Date().toISOString(),
      };
      saveCart(this.cart);
    },

    addItemToCart(productId: string, quantity: number) {
      const userStore = useUserStore();
      const user = userStore.currentUser;
      if (!user) throw new Error("No logged in user");

      if (!this.cart || this.cart.userId !== user.userId) {
        this.initializeCart();
      }

      const cart = this.cart!;
      const existingItem = cart.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      cart.updatedAt = new Date().toISOString();
      saveCart(cart);
    },

    updateQuantity(productId: string, quantity: number) {
      if (!this.cart) return;
      const item = this.cart.items.find((item) => item.productId === productId);
      if (!item) return;

      if (quantity < 1) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
      }

      this.cart.updatedAt = new Date().toISOString();
      saveCart(this.cart);
    },

    removeItem(productId: string) {
      if (!this.cart) return;
      this.cart.items = this.cart.items.filter(
        (item) => item.productId !== productId
      );
      this.cart.updatedAt = new Date().toISOString();
      saveCart(this.cart);
    },

    clearCart() {
      this.cart = null;
      localStorage.removeItem(CART_STORAGE_KEY);
    },
  },
});
