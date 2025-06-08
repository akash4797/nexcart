import { db } from "@/db";
import { supplier } from "@/db/supplier.schema";
import { isAdmin } from "@/lib/auth/serverAuth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
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
    const { name, address, contact, remark } = body;
    // Validate required fields
    if (!id || !name) {
      return NextResponse.json(
        { error: "ID, name are required" },
        { status: 400 },
      );
    }
    // Update supplier
    await db
      .update(supplier)
      .set({
        name,
        address: address || null,
        contact: contact || null,
        remark: remark || null,
      })
      .where(eq(supplier.id, id));

    return NextResponse.json(
      { message: "Supplier updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> },
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
    await db.delete(supplier).where(eq(supplier.id, id));
    return NextResponse.json(
      { message: "Supplier deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
