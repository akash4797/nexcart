import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as userSchema from "./user.schema";
import * as supplier from "./supplier.schema";

const schema = {
  users: userSchema.users,
  suppliers: supplier.supplier,
};

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db = drizzle(connection, { schema, mode: "default" });
