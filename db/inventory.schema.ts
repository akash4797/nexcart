import { mysqlTable, int, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { product } from "./product.schema";

export const inventory = mysqlTable("inventory", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("product_id")
    .notNull()
    .references(() => product.id)
    .unique(),
  totalQuantity: int("total_quantity").notNull().default(0),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(product, {
    fields: [inventory.productId],
    references: [product.id],
  }),
}));
