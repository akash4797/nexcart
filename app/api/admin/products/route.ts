import { db } from "@/db";
import { product } from "@/db/product.schema";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth/serverAuth";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    // Check authentication and admin role
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { name, description, image, remark } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Insert new product
    await db.insert(product).values({
      name,
      description: description || null,
      image: image || null,
      remark: remark || null,
    });

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
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

    // Retrieve all products
    const products = await db.select().from(product).orderBy(desc(product.id));
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error retrieving suppliers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
