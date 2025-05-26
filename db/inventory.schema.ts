import { mysqlTable, int, timestamp, decimal } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { product } from "./product.schema";

export const inventory = mysqlTable("inventory", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("product_id")
    .notNull()
    .references(() => product.id)
    .unique(),
  quantity: int("quantity").notNull().default(0),
  avgBuyPrice: decimal("avgBuyPrice", { precision: 10, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(product, {
    fields: [inventory.productId],
    references: [product.id],
  }),
}));
