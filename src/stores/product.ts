import { defineStore } from "pinia";
import type { Product } from "../types/product";
import {
  initDB,
  insertProduct,
  getAllProducts,
  updateProductStock,
} from "../utils/db";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [] as Product[],
  }),
  getters: {
    getProductById: (state) => (id: string) =>
      state.products.find((p) => p.productId === id),
  },
  actions: {
    async loadProducts() {
      await initDB();
      this.products = getAllProducts();
    },

    async addOrUpdateProduct(product: Product) {
      await initDB();
      insertProduct(product);
      const index = this.products.findIndex(
        (p) => p.productId === product.productId
      );
      if (index !== -1) {
        this.products[index] = product;
      } else {
        this.products.push(product);
      }
    },

    async reduceStock(productId: string, quantity: number = 1) {
      const product = this.products.find((p) => p.productId === productId);
      if (product && product.stocks >= quantity) {
        product.stocks -= quantity;
        await initDB();
        updateProductStock(productId, product.stocks);
      }
    },

    async increaseStock(productId: string, quantity: number) {
      const product = this.products.find((p) => p.productId === productId);
      if (product) {
        product.stocks += quantity;
        await initDB();
        updateProductStock(productId, product.stocks);
      }
    },
  },
});
