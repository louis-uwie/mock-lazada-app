<template>
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
</template>

<style scoped>
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
</style>

<script setup lang="ts">
const carouselImages = [
  "https://img.lazcdn.com/g/tps/imgextra/i4/O1CN0123eNgj1iLsZakxQC2_!!6000000004397-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01BA3eqW1eG99XQ69pX_!!6000000003843-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01oSalLQ1vsTln6vnpw_!!6000000006228-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01EV18yt1W4gJN6lpOK_!!6000000002735-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01OPzNdz1moVnTRR7y7_!!6000000005001-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
  "https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01jrlONu1zk0uVKavg4_!!6000000006751-0-tps-1976-688.jpg_2200x2200q80.jpg_.webp",
];
</script>
