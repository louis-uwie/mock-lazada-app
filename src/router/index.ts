import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Checkout from "../assets/pages/CheckOut.vue";
import Dashboard from "../assets/pages/Dashboard.vue";
import Store from "../assets/pages/Store.vue";
import Product from "../assets/pages/Product.vue";
import MyCart from "../assets/pages/MyCart.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/checkout", name: "Checkout", component: Checkout },

  { path: "/store/product_:id", name: "Product", component: Product },
  { path: "/store", name: "Store", component: Store },
  { path: "/account/:username/myCart", name: "MyCart", component: MyCart },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../assets/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
