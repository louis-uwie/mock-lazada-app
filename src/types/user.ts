export type AccType = "Merchant" | "Customer";

export interface User {
  userId: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
  accType: AccType;
  registerDate: Date;
}
