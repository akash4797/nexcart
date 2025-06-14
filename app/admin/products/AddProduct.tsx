import React from "react";
import { CircleX, PlusIcon } from "lucide-react";
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

const AddProduct = () => {
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null as File | null,
      remark: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string(),
      image: yup
        .mixed()
        .nullable()
        .test({
          message: `File too big, can't exceed 2MB`,
          test: (file) => {
            if (!file) return true;
            const isValid = (file as File)?.size < 2 * 1024 * 1024;
            return isValid;
          },
        }),
      remark: yup.string(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("remark", values.remark);
      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        formik.resetForm();
        toast.success("Product created successfully");
        mutate(Mutations.PRODUCTS.FETCH);
        setOpen(false);
      }
    },
  });
  return (
    <>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Add Product"
        trigger={
          <Button size={"sm"} className="text-xs sm:text-sm">
            <PlusIcon />
            Add Product
          </Button>
        }
      >
        <Modal.Form>
          <form className="mt-5 grid grid-cols-1 gap-5">
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Adidas AIR MAX 90"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
              )}
            </div>

            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="address">Description</Label>
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
              <Label htmlFor="contact">Image</Label>
              {!formik.values.image && (
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  placeholder="Image uploader will be here"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "image",
                      e.target.files ? e.target.files[0] : null,
                    )
                  }
                />
              )}
              {formik.values.image && (
                <div className="mb-2 relative w-fit">
                  <Button
                    className="absolute -top-2 -right-2 cursor-pointer h-6 w-6 rounded-full"
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => formik.setFieldValue("image", null)}
                  >
                    <CircleX />
                  </Button>
                  <Image
                    width={80}
                    height={80}
                    src={URL.createObjectURL(formik.values.image)}
                    alt="Selected product image"
                    className="h-20 w-auto object-contain rounded border border-gray-200"
                  />
                </div>
              )}
              {formik.touched.image && formik.errors.image && (
                <div className="text-red-500 text-xs">
                  {formik.errors.image}
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
            {formik.isSubmitting || formik.isValidating ? "Creating" : "Create"}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AddProduct;
