import { db } from "@/db";
import { product } from "@/db/product.schema";
import { isAdmin } from "@/lib/auth/serverAuth";
import { deleteImageFromMinIO, uploadImageToMinIO } from "@/lib/minio/image";
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

    // Get the content type to determine how to parse the request
    const contentType = request.headers.get("content-type") || "";

    let name: string, description: string, image: string | null, remark: string;
    let imageData = { url: null as string | null, key: null as string | null };

    // Handle FormData (file upload) or JSON
    if (contentType.includes("multipart/form-data")) {
      // Parse form data for file upload
      const formData = await request.formData();
      name = formData.get("name") as string;
      description = formData.get("description") as string;
      const imageFile = formData.get("image") as File;
      remark = formData.get("remark") as string;

      // Get the current product to check if we need to delete an existing image
      const [currentProduct] = await db
        .select()
        .from(product)
        .where(eq(product.id, id));

      // Handle image upload if provided
      if (imageFile && imageFile.size > 0) {
        // Delete old image if exists
        if (currentProduct.image_key) {
          await deleteImageFromMinIO(currentProduct.image_key);
        }

        // Upload new image
        const imageUploaded = await uploadImageToMinIO(imageFile);
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
      } else {
        // Keep existing image
        imageData = {
          url: currentProduct.image,
          key: currentProduct.image_key,
        };
      }
    } else {
      // Parse JSON body
      const body = await request.json();
      name = body.name;
      description = body.description;
      image = body.image;
      remark = body.remark;
      imageData.url = image;
    }

    // Validate required fields
    if (!id || !name) {
      return NextResponse.json(
        { error: "ID and name are required" },
        { status: 400 },
      );
    }

    // Update product
    await db
      .update(product)
      .set({
        name,
        description: description || null,
        image: imageData.url,
        image_key: imageData.key,
        remark: remark || null,
      })
      .where(eq(product.id, id));

    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _: Request,
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

    const [productToDelete] = await db
      .select()
      .from(product)
      .where(eq(product.id, id));

    console.log(productToDelete);

    if (productToDelete.image_key) {
      const deletedImage = await deleteImageFromMinIO(
        productToDelete.image_key,
      );
      console.log(deletedImage);
      if (!deletedImage) {
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 },
        );
      }
    }

    // Delete supplier
    await db.delete(product).where(eq(product.id, id));
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
