import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import { mutate } from "swr";
import { Mutations } from "@/lib/Constants";

const EditSupplier = ({ supplier }: { supplier: Supplier }) => {
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: supplier.name,
      address: supplier.address,
      remark: supplier.remark || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      address: yup.string().required("Address is required"),
      remark: yup.string(),
    }),
    onSubmit: async (values) => {
      const response = await fetch(`/api/admin/suppliers/${supplier.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Supplier updated successfully");
        mutate(Mutations.SUPPLIERS.FETCH);
        setOpen(false);
        formik.resetForm();
      }
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
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
            <div className="grid w-full max-w-full items-center gap-2 col-span-2">
              <Label htmlFor="remark">Remark</Label>
              <Input
                type="text"
                id="remark"
                placeholder="Write Remark here"
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
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <Button
            onClick={() => formik.submitForm()}
            disabled={formik.isSubmitting || formik.isValidating}
          >
            {formik.isSubmitting || formik.isValidating
              ? "Updating..."
              : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSupplier;
