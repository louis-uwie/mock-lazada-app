import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createPinia } from "pinia";

// import { useProductStore } from "./stores/product";
// import { products } from "./components/mock-products";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(ElementPlus);

// const productStore = useProductStore();

app.mount("#app");
