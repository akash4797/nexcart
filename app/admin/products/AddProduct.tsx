import React from "react";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import { mutate } from "swr";
import { Mutations } from "@/lib/Constants";
import Modal from "@/components/Modals/Modal";

const AddProduct = () => {
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      contact: "",
      remark: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      address: yup.string(),
      contact: yup.string(),
      remark: yup.string(),
    }),
    onSubmit: async (values) => {
      const response = await fetch("/api/admin/suppliers", {
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
              <Label htmlFor="address">Adress</Label>
              <Input
                type="text"
                id="address"
                placeholder="Dhaka, Bangladesh"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-xs">
                  {formik.errors.address}
                </div>
              )}
            </div>
            <div className="grid w-full max-w-full items-center gap-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                type="text"
                id="contact"
                placeholder="+8801..."
                value={formik.values.contact}
                onChange={formik.handleChange}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-red-500 text-xs">
                  {formik.errors.contact}
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

export default AddProduct;
