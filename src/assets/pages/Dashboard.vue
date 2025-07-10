<template>
  <div class="container">
    <div class="top-banner">
      <div class="carousel-block">
        <el-carousel
          height="420px"
          arrow="hover"
          indicator-position="inside"
          autoplay
          interval="4000"
        >
          <el-carousel-item v-for="(url, index) in carouselImages" :key="index">
            <img :src="url" alt="carousel image" class="carousel-image" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div v-if="userStore.currentUser" class="inbetween">
      <a
        href="https://example.com/link1"
        target="_blank"
        rel="noopener noreferrer"
        class="card-link"
      >
        <el-card shadow="hover" class="clickable-card">
          <img
            src="https://via.placeholder.com/300x150?text=Card+1"
            alt="Card 1 Image"
          />
          <h3>My Account</h3>
          <p>Top Up, Pay Bills, Personal Settings, and more!</p>
        </el-card>
      </a>

      <a
        href="https://example.com/link2"
        target="_blank"
        rel="noopener noreferrer"
        class="card-link"
      >
        <el-card shadow="hover" class="clickable-card">
          <img
            src="https://via.placeholder.com/300x150?text=Card+2"
            alt="Card 2 Image"
          />
          <h3>My Vouchers</h3>
          <p>Collect & Redeem!</p>
        </el-card>
      </a>

      <a
        href="https://example.com/link3"
        target="_blank"
        rel="noopener noreferrer"
        class="card-link"
      >
        <el-card shadow="hover" class="clickable-card">
          <img
            src="https://via.placeholder.com/300x150?text=Card+3"
            alt="Card 3 Image"
          />
          <h3>Download Now!</h3>
          <p>Try our Mobile App!</p>
        </el-card>
      </a>
    </div>

    <div class="middle-banner"><Store /></div>
    <div class="bottom-banner"></div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  max-width: 1620px;
  gap: 20px;
  width: 80vw;
}

.carousel-block {
  flex: 1 1 80%;
  height: 100%;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
}

.top-banner {
  display: flex;
  width: 100%;
  height: 420px;
  background-color: white;
}

.inbetween {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card-link {
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
  max-width: 33%;
  box-sizing: border-box;
}

.clickable-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.clickable-card img {
  width: 100%;
  height: auto;
  margin-bottom: 12px;
  border-radius: 8px;
}

.middle-banner {
  background-color: rgb(100, 75, 75);
  color: black;
  width: 100%;
}

.bottom-banner {
  background-color: rgb(196, 124, 124);
  color: black;
  width: 100%;
  height: 420px;
}

@media screen and (max-width: 1280px) {
  .carousel-image {
    object-fit: cover;
  }
}

@media screen and (max-width: 768px) {
  .carousel-image {
    object-fit: contain;
  }

  .carousel-block {
    background-color: rgb(240, 240, 240);
  }
}

@media screen and (max-width: 480px) {
}
</style>

<script setup lang="ts">
import Store from "./Store.vue";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const carouselImages = [
  "https://img.lazcdn.com/g/tps/imgextra/i4/O1CN0123eNgj1iLsZakxQC2_!!6000000004397-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01BA3eqW1eG99XQ69pX_!!6000000003843-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01oSalLQ1vsTln6vnpw_!!6000000006228-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01EV18yt1W4gJN6lpOK_!!6000000002735-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01OPzNdz1moVnTRR7y7_!!6000000005001-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01jrlONu1zk0uVKavg4_!!6000000006751-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
];
</script>
