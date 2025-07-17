<script setup lang="ts">
import { ref, computed } from "vue";
import { products } from "../../components/mock-products";
import Card from "../../components/Card.vue"; // Adjust path if different

const pageSize = 8;
const currentPage = ref(1);

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return products.slice(start, start + pageSize);
});
</script>

<template>
  <div class="pagination-wrapper">
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="products.length"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>

  <div class="product-list">
    <router-link
      v-for="(product, index) in paginatedProducts"
      :key="index"
      :to="`/store/product_${product.productId}`"
      class="product-link fade-in"
    >
      <Card :product="product" />
    </router-link>
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0 20px 40px;
}

.product-link {
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px; /* Flexible with a minimum width */
  max-width: 300px;
  min-width: 260px;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}

.product-link:hover {
  transform: translateY(-4px);
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

::v-deep .el-pager li {
  border-bottom: 1px solid transparent;
  transition: border-color 0.6s ease-in-out;
}

::v-deep .el-pager li:hover {
  border-bottom-color: white;
}

::v-deep .btn-prev,
::v-deep .btn-next {
  border-bottom: 1px solid transparent;
  transition: border-color 0.6s ease-in-out;
}

::v-deep .btn-prev:hover,
::v-deep .btn-next:hover {
  border-bottom-color: white;
}

::v-deep(.el-pagination) {
  color: white;
  background-color: transparent;
}

::v-deep(.el-pager li) {
  background-color: transparent;
  color: white;
}

::v-deep(.el-pager li.is-active) {
  color: #ffd700;
  font-weight: bold;
  background-color: transparent;
}

::v-deep(.btn-prev),
::v-deep(.btn-next) {
  color: white;
  background-color: transparent;
}

::v-deep(.btn-next.is-last) {
  color: white;
  background-color: transparent;
}

::v-deep(.el-pagination button:disabled) {
  color: rgba(255, 255, 255, 0.4);
  background-color: transparent;
  cursor: not-allowed;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
