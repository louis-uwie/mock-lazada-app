<template>
  <div class="container">
    <div class="top-banner">
      <div class="carousel-block">
        <el-carousel
          height="440px"
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

    <div v-if="userStore.currentUser" class="inbetween"><QuickTabs /></div>

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
  /* height: 100%; */
  height: 40vh;
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
  height: 440px;
  background-color: white;
  border-radius: 20px;
}

.inbetween {
  display: flex;
  gap: 20px;
  justify-content: space-between;
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
    object-fit: cover;
  }

  .carousel-block {
    background-color: rgb(240, 240, 240);
  }

  .inbetween {
    flex-direction: column;
  }

  .card-link {
    max-width: 100%;
    flex: 1 1 100%;
  }

  .clickable-card {
    width: 100%;
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
