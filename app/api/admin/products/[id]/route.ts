import { db } from "@/db";
import { product } from "@/db/product.schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/auth/serverAuth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    // Check authentication and admin role
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //parse query
    const { id } = await params;
    // Parse request body
    const body = await request.json();
    const { name, description, image, remark } = body;
    // Validate required fields
    if (!id || !name) {
      return NextResponse.json(
        { error: "ID, name are required" },
        { status: 400 }
      );
    }
    // Update supplier
    await db
      .update(product)
      .set({
        name,
        description: description || null,
        image: image || null,
        remark: remark || null,
      })
      .where(eq(product.id, id));

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    // Check authentication and admin role
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //parse query
    const { id } = await params;

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    // Delete supplier
    await db.delete(product).where(eq(product.id, id));
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
