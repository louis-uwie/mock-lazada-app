import type { Product } from "./product";
import type { User } from "./user";

// This is the ITEM
// ( i.e., What is being bought -- 1 x Headset)
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  seller: User;
}

// This is the ORDER LIST / ARRAY of the User's Order.
// ( i.e., User X is buying 1 Headset, its tracking number is... )
export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt?: string;
}
