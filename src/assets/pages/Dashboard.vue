<template>
  <div class="container">
    <div class="top-banner"><UserInformation /></div>

    <div v-if="userStore.currentUser" class="inbetween"><QuickTabs /></div>

    <div class="banner"><Store /></div>
    <div class="banner"></div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  max-width: 1620px;
  min-width: 300px;
  gap: 20px;
  width: 80vw;
}

.top-banner {
  /* display: none; */
  width: 100%;
  background-color: white;
  border-radius: 20px;
}

.banner {
  /* background-color: rgb(229, 229, 229); */
  color: black;
  width: 100%;
}

.inbetween {
  display: flex;
  gap: 20px;
  justify-content: space-between;
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
import UserInformation from "../../components/UserInformation.vue";
import ShopCarousel from "../../components/ShopCarousel.vue";

const userStore = useUserStore();
</script>
