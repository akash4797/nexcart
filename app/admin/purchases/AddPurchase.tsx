import Modal from "@/components/Modals/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mutations } from "@/lib/Constants";
import { useFormik } from "formik";
import { PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import * as yup from "yup";

const AddPurchase = () => {
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      productId: "",
      supplierId: "",
      quantity: "",
      buyPrice: "",
      remark: "",
    },
    validationSchema: yup.object({
      productId: yup.string().required("Product is required"),
      supplierId: yup.string().required("Supplier is required"),
      quantity: yup.number().required("Quantity is required"),
      buyPrice: yup.number().required("Buy Price is required"),
      remark: yup.string(),
    }),
    onSubmit: async (values) => {
      const response = await fetch("/api/admin/purchases", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        formik.resetForm();
        toast.success("Supplier created successfully");
        mutate(Mutations.SUPPLIERS.FETCH);
        setOpen(false);
      }
    },
  });

  if (formik.errors) {
    console.log(formik.errors);
  }
  return (
    <>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Add Purchase"
        trigger={
          <Button size={"sm"} className="text-xs sm:text-sm">
            <PlusIcon />
            Add Purchase
          </Button>
        }
      >
        <Modal.Form>
          <form className="mt-5 grid grid-cols-2 gap-5">
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="name">productId</Label>
              <Input
                type="text"
                id="productId"
                placeholder="ProductId"
                value={formik.values.productId}
                onChange={formik.handleChange}
              />
              {formik.touched.productId && formik.errors.productId && (
                <div className="text-red-500 text-xs">
                  {formik.errors.productId}
                </div>
              )}
            </div>
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="address">supplierId</Label>
              <Input
                type="text"
                id="supplierId"
                placeholder="supplierId"
                value={formik.values.supplierId}
                onChange={formik.handleChange}
              />
              {formik.touched.supplierId && formik.errors.supplierId && (
                <div className="text-red-500 text-xs">
                  {formik.errors.supplierId}
                </div>
              )}
            </div>
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="contact">quantity</Label>
              <Input
                type="text"
                id="quantity"
                placeholder="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="text-red-500 text-xs">
                  {formik.errors.quantity}
                </div>
              )}
            </div>
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="contact">buyPrice</Label>
              <Input
                type="text"
                id="buyPrice"
                placeholder="buyPrice"
                value={formik.values.buyPrice}
                onChange={formik.handleChange}
              />
              {formik.touched.buyPrice && formik.errors.buyPrice && (
                <div className="text-red-500 text-xs">
                  {formik.errors.buyPrice}
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
            {formik.isSubmitting || formik.isValidating ? "Creating" : "Create"}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AddPurchase;
