import { db } from "@/db";
import { supplier } from "@/db/supplier.schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Check authentication and admin role
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { name, address, remark } = body;

    // Validate required fields
    if (!name || !address) {
      return NextResponse.json(
        { error: "Name and address are required" },
        { status: 400 }
      );
    }

    // Insert new supplier
    await db.insert(supplier).values({
      name,
      address,
      remark: remark || null,
    });

    return NextResponse.json(
      { message: "Supplier created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
