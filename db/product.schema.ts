import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { purchase } from "./purchase.schema";

export const product = mysqlTable("product", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  image: varchar("image", { length: 255 }),
  imageId: int("image_id"),
  remark: varchar("remark", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow().notNull(),
});

export const productRelations = relations(product, ({ many }) => ({
  purchases: many(purchase),
}));
