export type Category = "Electronics" | "Food" | "Toys" | "Clothing";
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Product {
  id?: number;
  name: string;
  img: string;
  seller: string;
  category: Category;
  stocks: number;
  description: string;
  rating: Rating;
  price: number;
}
