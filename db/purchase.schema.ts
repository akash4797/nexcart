import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  decimal,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { product } from "./product.schema";
import { supplier } from "./supplier.schema";

export const purchase = mysqlTable("purchase", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("product_id").references(() => product.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  supplierId: int("supplier_id").references(() => supplier.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  quantity: int("quantity").notNull(),
  buyPrice: decimal("buy_price", { precision: 10, scale: 2 }).notNull(),
  otherExpense: decimal("other_expense", { precision: 10, scale: 2 }),
  remark: varchar("remark", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const purchaseRelations = relations(purchase, ({ one }) => ({
  product: one(product, {
    fields: [purchase.productId],
    references: [product.id],
  }),
  supplier: one(supplier, {
    fields: [purchase.supplierId],
    references: [supplier.id],
  }),
}));
