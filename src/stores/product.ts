import { defineStore } from "pinia";
import type { Product } from "../types/product";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
  }),
  getters: {
    getProductById: (state) => (id: string) =>
      state.products.find((p) => p.productId === id),
  },
  actions: {
    setProducts(products: Product[]) {
      this.products = products;
    },

    reduceStock(productId: string, quantity: number = 1) {
      const product = this.products.find((p) => p.productId === productId);
      if (product && product.stocks >= quantity) {
        product.stocks -= quantity;
      }
    },
  },
});
