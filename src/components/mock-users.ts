import { v4 as uuidv4 } from "uuid";
import type { User } from "../types/user";

export const users: User[] = [
  {
    userId: uuidv4(),
    fname: "Marco",
    lname: "Reyes",
    username: "marcorey",
    password: "password123",
    accType: "Merchant",
    registerDate: new Date("2022-03-21"),
    wallet: 3500.75,
  },
  {
    userId: uuidv4(),
    fname: "Jerome",
    lname: "Lee",
    username: "jlee_shop",
    password: "securepass",
    accType: "Merchant",
    registerDate: new Date("2021-07-19"),
    wallet: 12000.0,
  },
  {
    userId: uuidv4(),
    fname: "Anna",
    lname: "Santos",
    username: "annasantos",
    password: "welcome123",
    accType: "Customer",
    registerDate: new Date("2023-01-11"),
    wallet: 250.0,
  },
  {
    userId: uuidv4(),
    fname: "Carlos",
    lname: "Tan",
    username: "ctan88",
    password: "mysecret",
    accType: "Customer",
    registerDate: new Date("2022-11-05"),
    wallet: 875.3,
  },
  {
    userId: uuidv4(),
    fname: "Diane",
    lname: "Lim",
    username: "dianelim",
    password: "passw0rd",
    accType: "Customer",
    registerDate: new Date("2021-05-25"),
    wallet: 4200.99,
  },
];

export default users;
