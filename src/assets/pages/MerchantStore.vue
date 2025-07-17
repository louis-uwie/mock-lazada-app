<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/user";
import { products } from "../../components/mock-products";

const userStore = useUserStore();
const currentUser = computed(() => userStore.currentUser); // reactive

const pageSize = 8;
const currentPage = ref(1);

// Filter only the products by the current logged-in merchant
const merchantProducts = computed(() => {
  if (!currentUser.value) return [];
  return products.filter(
    (product) => product.seller.username === userStore.currentUser?.username
  );
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return merchantProducts.value.slice(start, start + pageSize);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <div v-if="!currentUser" class="no-products">
    Please log in to view your products.
  </div>

  <div v-else>
    <div class="pagination-wrapper" v-if="merchantProducts.length">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="merchantProducts.length"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>

    <div class="product-list" v-if="merchantProducts.length">
      <router-link
        v-for="(product, index) in paginatedProducts"
        :key="index"
        :to="`/store/product_${product.productId}`"
        class="product-link"
      >
        <el-card class="product-card" shadow="hover">
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

    <div v-else class="no-products">
      You don't have any products listed yet.
    </div>
  </div>
</template>

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

.no-products {
  text-align: center;
  color: #999;
  font-size: 1.2rem;
  margin-top: 5rem;
  font-style: italic;
}

/* Element Plus pagination style overrides */
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
::v-deep(.btn-next),
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
