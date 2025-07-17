import initSqlJs from "sql.js";
import type { Product } from "../types/product";
import type { User } from "../types/user";
import { users } from "../components/mock-users";

let SQL: any = null;
let db: any = null;
type UserDB = Omit<User, "registerDate"> & { registerDate: string | Date };

function saveToLocalStorage() {
  const data = db.export();
  const base64 = btoa(String.fromCharCode(...data));
  localStorage.setItem("my-db", base64);
}

function loadFromLocalStorage(): Uint8Array | null {
  const base64 = localStorage.getItem("my-db");
  if (!base64) return null;
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function initDB() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: () => "../../public/sql-wasm.wasm",
    });
  }
  if (!db) {
    const stored = loadFromLocalStorage();
    db = stored ? new SQL.Database(stored) : new SQL.Database();

    // Create tables if needed
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        userId TEXT PRIMARY KEY,
        username TEXT,
        fname TEXT,
        lname TEXT,
        password TEXT,
        accType TEXT,
        registerDate TEXT,
        wallet REAL,
        homeAddress TEXT
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        productId TEXT PRIMARY KEY,
        img TEXT,
        name TEXT,
        sellerId TEXT,
        category TEXT,
        stocks INTEGER,
        description TEXT,
        price REAL,
        sale REAL,
        FOREIGN KEY(sellerId) REFERENCES users(userId)
      );
    `);

    // Insert mock users if users table is empty
    const checkStmt = db.prepare("SELECT COUNT(*) as count FROM users");
    checkStmt.step();
    const row = checkStmt.getAsObject();
    checkStmt.free();

    if (row.count === 0) {
      // Insert all mock users
      users.forEach((user) => insertUser(user));
      console.log("Inserted mock users into DB");
    }
  }

  return db;
}
export function insertUser(user: User) {
  console.log("insertUser data:", user);

  const normalizedRegisterDate =
    user.registerDate instanceof Date
      ? user.registerDate.toISOString()
      : typeof user.registerDate === "string"
      ? user.registerDate
      : new Date().toISOString(); // fallback

  const normalizedWallet =
    typeof user.wallet === "number"
      ? user.wallet
      : parseFloat(String(user.wallet)) || 0;

  const normalizedHomeAddress =
    typeof user.homeAddress === "string" || user.homeAddress === null
      ? user.homeAddress
      : String(user.homeAddress ?? "");

  const values = [
    user.userId,
    user.username,
    user.fname,
    user.lname,
    user.password,
    user.accType,
    normalizedRegisterDate,
    normalizedWallet,
    normalizedHomeAddress,
  ];

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO users (
      userId, username, fname, lname, password, accType, registerDate, wallet, homeAddress
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(values);
  stmt.free();
  saveToLocalStorage();
}

export function getUser(userId: string) {
  const stmt = db.prepare(`SELECT * FROM users WHERE userId = ?`);
  stmt.bind([userId]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    if (row.registerDate) {
      row.registerDate = new Date(row.registerDate);
    }
    return row;
  }
  stmt.free();
  return null;
}

export function deleteUser(userId: string) {
  db.run(`DELETE FROM users WHERE userId = ?`, [userId]);
  saveToLocalStorage();
}

export function loginWithCredentials(
  username: string,
  password: string
): User | null {
  console.log("loginWithCredentials called with:", username, password);
  const stmt = db.prepare(
    `SELECT * FROM users WHERE username = ? AND password = ?`
  );

  console.log("Binding params:", [username, password]);
  stmt.bind([username, password]);

  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    console.log("loginWithCredentials: user found:", row);

    const user: User = {
      ...(row as any),
      registerDate: row.registerDate ? new Date(row.registerDate) : new Date(),
    };

    insertUser({
      ...user,
      userId: "current",
      registerDate: user.registerDate,
    });

    return user;
  }

  stmt.free();
  console.log("loginWithCredentials: no user found");
  return null;
}

export function registerUser(user: User): boolean {
  const existing = getUserByUsername(user.username);
  if (existing) return false; // prevent duplicates

  insertUser(user); // saved under their own ID
  return true;
}

export function getUserByUsername(username: string): User | null {
  const stmt = db.prepare(`SELECT * FROM users WHERE username = ?`);
  stmt.bind([username]); // <-- binding here, should be a string, so this looks okay

  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    console.log("getUserByUsername found:", row);
    return {
      ...(row as any),
      registerDate: row.registerDate ? new Date(row.registerDate) : new Date(),
    };
  }

  stmt.free();
  console.log("getUserByUsername: no user found for", username);
  return null;
}

// Product functions:

export function insertProduct(product: Product) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO products (
      productId, img, name, sellerId, category, stocks, description, price, sale
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run([
    product.productId,
    product.img,
    product.name,
    product.seller.userId,
    product.category,
    product.stocks,
    product.description,
    product.price,
    product.sale,
  ]);
  stmt.free();
  saveToLocalStorage();
}

export function getProduct(productId: string): Product | null {
  const stmt = db.prepare(`SELECT * FROM products WHERE productId = ?`);
  stmt.bind([productId]);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    const seller = getUser(row.sellerId);
    if (!seller) return null;
    return {
      productId: row.productId,
      img: row.img,
      name: row.name,
      seller,
      category: row.category,
      stocks: row.stocks,
      description: row.description,
      price: row.price,
      sale: row.sale,
    };
  }
  stmt.free();
  return null;
}

export function getAllProducts(): Product[] {
  const stmt = db.prepare(`SELECT * FROM products`);
  const products: Product[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    const seller = getUser(row.sellerId);
    if (seller) {
      products.push({
        productId: row.productId,
        img: row.img,
        name: row.name,
        seller,
        category: row.category,
        stocks: row.stocks,
        description: row.description,
        price: row.price,
        sale: row.sale,
      });
    }
  }
  stmt.free();
  return products;
}

export function updateProductStock(productId: string, newStock: number) {
  db.run(`UPDATE products SET stocks = ? WHERE productId = ?`, [
    newStock,
    productId,
  ]);
  saveToLocalStorage();
}
