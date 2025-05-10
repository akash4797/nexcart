import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as userSchema from './userSchema';

const schema = {
  users: userSchema.users,
}

const connection = await mysql.createConnection({
  host: "104.194.8.175",
  user: "unifyxen_nexcart_admin",
  database: "unifyxen_nexcart",
  password: "nexcart2025!",
});

export const db = drizzle(connection, { schema, mode: 'default' });