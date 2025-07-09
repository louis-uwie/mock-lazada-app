import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Checkout from "../components/CheckOut.vue";
import Dashboard from "../components/Dashboard.vue";
import Store from "../components/Store.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/checkout", name: "Checkout", component: Checkout },
  { path: "/store", name: "Store", component: Store },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
