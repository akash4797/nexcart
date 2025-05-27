export const uploadImageToWP = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const username = process.env.WP_USERNAME!;
    const appPassword = process.env.WP_APP_PASSWORD!;
    const credentials = btoa(`${username}:${appPassword}`);

    const res = await fetch(
      `${process.env.MEDIA_UPLOAD_URL!}/wp-json/wp/v2/media`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Disposition": `attachment; filename="${file.name}"`,
        },
        body: formData,
      }
    );
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error };
  }
};

export const deleteImageFromWP = async (id: number) => {
  try {
    const username = process.env.WP_USERNAME!;
    const appPassword = process.env.WP_APP_PASSWORD!;
    const credentials = btoa(`${username}:${appPassword}`);
    const res = await fetch(
      `${process.env.MEDIA_UPLOAD_URL!}/wp-json/wp/v2/media/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );
    if (!res.ok) throw new Error("Delete failed");
    return { success: true };
  } catch (error) {
    return { error: error };
  }
};
