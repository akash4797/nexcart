import { db } from "@/db";
import { product } from "@/db/product.schema";
import { isAdmin } from "@/lib/auth/serverAuth";
import { uploadImageToMinIO } from "@/lib/minio/image";
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
    const body = await request.formData();
    const name = body.get("name") as string;
    const description = body.get("description") as string;
    const image = body.get("image") as File;
    const remark = body.get("remark") as string;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let imageData = {
      url: null as string | null,
      key: null as string | null,
    };

    if (image) {
      const imageUploaded = await uploadImageToMinIO(image);

      if (!imageUploaded) {
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 400 },
        );
      }

      imageData = {
        url: imageUploaded.url || null,
        key: imageUploaded.key || null,
      };
    }

    await db.insert(product).values({
      name,
      description: description || null,
      image: imageData.url,
      image_key: imageData.key,
      remark: remark || null,
    });

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
      { status: 500 },
    );
  }
}
