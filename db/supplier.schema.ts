import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { purchase } from "./purchase.schema";

export const supplier = mysqlTable("supplier", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }),
  contact: varchar("contact", { length: 255 }),
  remark: varchar("remark", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow().notNull(),
});

export const supplierRelations = relations(supplier, ({ many }) => ({
  purchases: many(purchase),
}));
