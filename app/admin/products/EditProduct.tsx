import React from "react";
import { CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import { mutate } from "swr";
import { Mutations } from "@/lib/Constants";
import Modal from "@/components/Modals/Modal";
import Image from "next/image";

const EditProduct = ({ product }: { product: Product }) => {
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description || "",
      imageUrl: product.image || "",
      imageFile: null as File | null,
      remark: product.remark || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string(),
      imageUrl: yup.string(),
      imageFile: yup
        .mixed()
        .nullable()
        .test({
          name: "fileSize",
          message: `File too big, can't exceed 2MB`,
          test: function (value) {
            // Skip validation if no file is provided or if imageUrl exists
            if (!value || this.parent.imageUrl) return true;
            return (value as File)?.size < 2 * 1024 * 1024;
          },
        }),

      remark: yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        let response;

        // If a new image file is selected, use FormData
        if (values.imageFile) {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("description", values.description || "");
          formData.append("image", values.imageFile);
          formData.append("remark", values.remark || "");

          response = await fetch(`/api/admin/products/${product.id}`, {
            method: "PUT",
            body: formData,
          });
        } else {
          // Otherwise, use JSON with the existing image URL
          response = await fetch(`/api/admin/products/${product.id}`, {
            method: "PUT",
            body: JSON.stringify({
              name: values.name,
              description: values.description || "",
              image: values.imageUrl || "",
              remark: values.remark || "",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        if (response.ok) {
          toast.success("Product updated successfully");
          mutate(Mutations.PRODUCTS.FETCH);
          setOpen(false);
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to update product");
        }
      } catch (error) {
        toast.error("An error occurred while updating the product");
        console.error(error);
      }
    },
  });

  return (
    <>
      <Modal
        title="Update Product"
        open={open}
        onOpenChange={setOpen}
        trigger={<Button size={"sm"}>Edit</Button>}
      >
        <Modal.Form>
          <form className="mt-5 grid grid-cols-1 gap-5">
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Product name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
              )}
            </div>

            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write about the product..."
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-xs">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="remark">Remark</Label>
              <Input
                type="text"
                id="remark"
                placeholder="Write Remark here..."
                value={formik.values.remark}
                onChange={formik.handleChange}
              />
              {formik.touched.remark && formik.errors.remark && (
                <div className="text-red-500 text-xs">
                  {formik.errors.remark}
                </div>
              )}
            </div>
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="image">Image</Label>

              {/* Display existing image or newly selected image */}
              {(formik.values.imageUrl || formik.values.imageFile) && (
                <div className="mb-2 relative w-fit">
                  <Button
                    className="absolute -top-2 -right-2 cursor-pointer h-6 w-6 rounded-full"
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => {
                      formik.setFieldValue("imageFile", null);
                      if (formik.values.imageFile) {
                        // If we're removing a newly selected file, restore the original URL
                        formik.setFieldValue("imageUrl", product.image || "");
                      } else {
                        // If we're removing the original image
                        formik.setFieldValue("imageUrl", "");
                      }
                    }}
                  >
                    <CircleX />
                  </Button>
                  <Image
                    width={80}
                    height={80}
                    src={
                      formik.values.imageFile
                        ? URL.createObjectURL(formik.values.imageFile)
                        : formik.values.imageUrl
                    }
                    alt="Product image"
                    className="h-20 w-auto object-contain rounded border border-gray-200"
                  />
                </div>
              )}

              {/* File input for selecting a new image */}
              <Input
                type="file"
                id="imageFile"
                accept="image/*"
                placeholder="Select new image"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  formik.setFieldValue("imageFile", file);
                  // Clear the imageUrl when a new file is selected
                  if (file) {
                    formik.setFieldValue("imageUrl", "");
                  }
                }}
              />
              {formik.touched.imageFile && formik.errors.imageFile && (
                <div className="text-red-500 text-xs">
                  {formik.errors.imageFile}
                </div>
              )}
            </div>
          </form>
        </Modal.Form>
        <Modal.Actions>
          <Button
            onClick={() => formik.submitForm()}
            disabled={formik.isSubmitting || formik.isValidating}
          >
            {formik.isSubmitting || formik.isValidating
              ? "Updating..."
              : "Update"}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default EditProduct;
