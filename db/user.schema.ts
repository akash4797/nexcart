import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).unique().notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow().notNull(),
});
