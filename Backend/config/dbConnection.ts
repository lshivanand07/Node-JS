import mysql, { Pool } from "mysql2/promise";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_HOST) {
  throw new Error("Missing DB_HOST");
}

const db: Pool = mysql.createPool({
  host: process.env.DB_HOST || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  connectionLimit: 10,
  waitForConnections: true,
});

export { db };