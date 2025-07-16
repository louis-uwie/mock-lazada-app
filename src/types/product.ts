import type { User } from "./user";

export type Category =
  | "Electronics"
  | "Food"
  | "Toys"
  | "Clothing"
  | "Home"
  | "Sports"
  | "Kitchen"
  | "Music"
  | "Travel"
  | "Office"
  | "Outdoors";

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Product {
  productId: string;
  img: string;
  name: string;
  seller: User;
  category: Category;
  stocks: number;
  description: string;
  price: number;
  sale: number;
}
