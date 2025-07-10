import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { User } from "../types/user";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  function login(user: User) {
    currentUser.value = user;
  }

  function logout() {
    currentUser.value = null;
  }

  watch(currentUser, (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  });

  return { currentUser, login, logout };
});
