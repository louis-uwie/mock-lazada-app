import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types/user";
import { login as loginUser } from "../modules/login"; // use this name consistently
import {
  initDB,
  getUser,
  deleteUser,
  registerUser,
  insertUser,
} from "../utils/db";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User | null>(null);

  async function login(username: string, password: string): Promise<boolean> {
    await initDB();

    // You must await loginUser here since it returns a Promise
    const user = await loginUser(username, password); // <-- add await here!

    if (!user) return false;

    insertUser({ ...user, userId: "current" });
    currentUser.value = { ...user, userId: "current" };
    return true;
  }

  async function register(newUser: User): Promise<boolean> {
    await initDB();
    return registerUser(newUser);
  }

  async function logout() {
    await initDB();
    deleteUser("current");
    currentUser.value = null;
  }

  async function loadUser() {
    await initDB();
    const user = getUser("current");
    currentUser.value = user ? (user as User) : null;
  }

  async function updateUser(updatedUser: User) {
    await initDB();

    // Update the real user record by their own userId
    insertUser({ ...updatedUser, userId: updatedUser.userId });

    // Also update the current session copy
    insertUser({ ...updatedUser, userId: "current" });

    currentUser.value = { ...updatedUser, userId: "current" };
  }

  return {
    currentUser,
    login,
    logout,
    loadUser,
    updateUser,
    register,
  };
});
