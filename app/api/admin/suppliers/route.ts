import { db } from "@/db";
import { supplier } from "@/db/supplier.schema";
import { isAdmin } from "@/lib/auth/serverAuth";
import { desc } from "drizzle-orm";
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
    const { name, address, contact, remark } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Insert new supplier
    await db.insert(supplier).values({
      name,
      address: address || null,
      contact: contact || null,
      remark: remark || null,
    });

    return NextResponse.json(
      { message: "Supplier created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    // Check authentication and admin role
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve all suppliers
    const suppliers = await db
      .select()
      .from(supplier)
      .orderBy(desc(supplier.id));
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    console.error("Error retrieving suppliers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
