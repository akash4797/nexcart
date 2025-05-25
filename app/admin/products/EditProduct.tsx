import React from "react";
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

const EditProduct = ({ product }: { product: Product }) => {
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description || "",
      image: product.image || "",
      remark: product.remark || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string(),
      image: yup.string(),
      remark: yup.string(),
    }),
    onSubmit: async (values) => {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        formik.setValues({
          name: values.name,
          description: values.description || "",
          image: values.image || "",
          remark: values.remark || "",
        });
        toast.success("Product updated successfully");
        mutate(Mutations.PRODUCTS.FETCH);
        setOpen(false);
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
          <form className="mt-5 grid grid-cols-2 gap-5">
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs">{formik.errors.name}</div>
              )}
            </div>
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="contact">Image</Label>
              <Input
                type="text"
                id="image"
                placeholder="image input here"
                value={formik.values.image}
                onChange={formik.handleChange}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="text-red-500 text-xs">
                  {formik.errors.image}
                </div>
              )}
            </div>
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="address">Description</Label>
              <Textarea
                id="description"
                placeholder="Write about the produt..."
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
