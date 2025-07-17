import type { User } from "../types/user";
import { getUserByUsername, initDB } from "../utils/db";

export async function login(
  username: string,
  password: string
): Promise<User | null> {
  await initDB(); // ensure DB is initialized
  const user = getUserByUsername(username);

  console.log("loginUser: fetched user", user);
  console.log("loginUser: stored password:", user?.password);
  console.log("loginUser: input password:", password);
  console.log("loginUser: passwords match?", user?.password === password);

  if (user && user.password === password) {
    return user;
  }

  return null;
}
