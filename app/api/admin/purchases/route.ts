import { db } from "@/db";
import { inventory } from "@/db/inventory.schema";
import { purchase } from "@/db/purchase.schema";
import { isAdmin } from "@/lib/auth/serverAuth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Check authentication and admin role
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { productId, supplierId, quantity, buyPrice, otherExpense, remark } =
      body;

    // Validate required fields
    if (!productId || !supplierId || !quantity || !buyPrice) {
      return NextResponse.json(
        { error: "Please fill the required fields" },
        { status: 400 },
      );
    }

    // Insert into purchase
    const purchaseResult = await db.insert(purchase).values({
      productId,
      supplierId,
      quantity,
      buyPrice,
      otherExpense: otherExpense || 0,
      remark: remark || "",
    });

    if (!purchaseResult)
      return NextResponse.json({ error: "Purchase failed" }, { status: 400 });

    // Check if inventory already exists
    const [existingInventory] = await db
      .select()
      .from(inventory)
      .where(eq(inventory.productId, productId));

    // Calculate new inventory values
    const newTotalQuantity =
      (existingInventory?.quantity || 0) + parseInt(quantity);
    const newTotalCost =
      Number(existingInventory?.quantity || 0) *
        Number(existingInventory?.avgBuyPrice || 0) +
      quantity * buyPrice;
    const newAvgPrice = newTotalCost / newTotalQuantity;

    // Update or insert inventory
    if (existingInventory) {
      await db
        .update(inventory)
        .set({
          quantity: newTotalQuantity,
          avgBuyPrice: newAvgPrice.toString(),
        })
        .where(eq(inventory.productId, productId));
    } else {
      await db.insert(inventory).values({
        productId,
        quantity,
        avgBuyPrice: buyPrice,
      });
    }

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
