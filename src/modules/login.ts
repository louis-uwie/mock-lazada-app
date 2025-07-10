import { users } from "../components/mock-users"; // adjust path if needed
import type { User } from "../types/user";

export function login(username: string, password: string): User | null {
  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  return foundUser ?? null;
}
