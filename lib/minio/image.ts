// lib/minio/uploadImageToMinIO.ts
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";

export const uploadImageToMinIO = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${file.name}`;
    const bucket = process.env.MINIO_BUCKET!;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `products/${fileName}`,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    const url = `${process.env.MINIO_PUBLIC_URL}/${bucket}/products/${fileName}`;
    return {
      url,
      key: `products/${fileName}`,
    };
  } catch (error) {
    console.error("MinIO Upload Error:", error);
    return null;
  }
};

export const deleteImageFromMinIO = async (key: string) => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.MINIO_BUCKET!,
        Key: key,
      }),
    );
    return true;
  } catch (error) {
    console.error("MinIO Delete Error:", error);
    return false;
  }
};
