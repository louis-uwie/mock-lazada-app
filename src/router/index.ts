import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Checkout from "../assets/pages/CheckOut.vue";
import Dashboard from "../assets/pages/Dashboard.vue";
import Store from "../assets/pages/Store.vue";
import MyCart from "../assets/pages/MyCart.vue";
import MerchantStore from "../assets/pages/MerchantStore.vue";
import MyAccount from "../assets/pages/MyAccount.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/checkout", name: "Checkout", component: Checkout },
  { path: "/store", name: "Store", component: Store },
  { path: "/account/:username/myCart", name: "MyCart", component: MyCart },
  {
    path: "/account/:username/myAccount",
    name: "MyAccount",
    component: MyAccount,
  },
  {
    path: "/merchant/:username/myStore",
    name: "MerchantStore",
    component: MerchantStore,
  },
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
