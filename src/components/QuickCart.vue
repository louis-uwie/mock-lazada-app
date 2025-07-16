<template>
  <div class="container">
    <button
      @click="goToCart"
      class="checkout-button"
      aria-label="Go to My Cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { defineEmits } from "vue";

const router = useRouter();
const userStore = useUserStore();

const emit = defineEmits(["show-login"]);

const goToCart = () => {
  const user = userStore.currentUser;
  if (!user) {
    emit("show-login"); // You can show login modal if not logged in
    return;
  }

  router.push(`/account/${user.username}/myCart`);
};
</script>

<style scoped>
.container {
  position: fixed;
  right: 40px;
  bottom: 60px;
  aspect-ratio: 1/1;
  max-width: 64px;
  max-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* fill container width */
  height: 100%; /* fill container height */
  border-radius: 50%;
  color: black;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  background: linear-gradient(
    -45deg,
    #ff9a9e,
    #fad0c4,
    #fbc2eb,
    #a6c1ee,
    #84fab0,
    #8fd3f4,
    #cfd9df
  );
  background-size: 400% 400%;
  animation: randomGradient 90s ease infinite;
}

.checkout-button:hover {
  background-color: #0056b3;
}

.icon {
  width: 50%; /* icon fills half of button */
  height: 50%;
}
</style>
