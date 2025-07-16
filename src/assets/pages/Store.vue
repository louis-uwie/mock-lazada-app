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
      class="product-link"
    >
      <el-card class="product-card" shadow="hover">
        <!-- <img :src="product.img" alt="Product Image" class="product-image" /> -->
        <img
          src="../images/europeana-kWrE1KDiR48-unsplash.jpg"
          class="product-image"
        />
        <template #footer>
          <div class="product-info">
            <strong>{{ product.name }}</strong
            ><br />
            Price: <b>₱{{ product.price.toFixed(2) }}</b
            ><br />
            Seller: {{ product.seller.username }}<br />
            Category: {{ product.category }}
          </div>
        </template>
      </el-card>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { products } from "../../components/mock-products";

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

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  justify-content: center;
}

.product-link {
  text-decoration: none;
  color: inherit;
  max-width: 320px;
  width: 100%;
}

.product-card {
  transition: all 0.3s ease-in-out;
}
.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  font-size: 16px;
  line-height: 1.4;
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
</style>
