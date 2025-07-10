<template>
  <div class="container">
    <div class="top-banner">
      <div class="carousel-block">
        <el-carousel height="420px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="carousel-item-text">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="right-block">
        <a
          href="https://apps.apple.com/us/app/lazada-all-shipping-on-us/id785385147"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../assets/images/top-banner-clickable.png"
            alt="Clickable Banner"
          />
        </a>
      </div>
    </div>

    <div class="middle-banner"><Store vue></Store></div>
    <div class="bottom-banner"></div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.top-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: black;
  width: 100%;
  height: 420px;
}

.middle-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(100, 75, 75);
  color: black;
  width: 100%;
}
.bottom-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(196, 124, 124);
  color: black;
  width: 100%;
  height: 420px;
}

.carousel-block {
  width: 85%;
  height: 100%;
  background-color: antiquewhite;
}

.right-block {
  width: 15%;
  height: 100%;
}

.right-block img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>

<script setup lang="ts">
import Store from "./Store.vue";
</script>
