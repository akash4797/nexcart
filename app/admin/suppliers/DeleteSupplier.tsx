import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mutate } from "swr";
import { Mutations } from "@/lib/Constants";

const DeleteSupplier = ({ supplier }: { supplier: Supplier }) => {
  const handleDelete = async () => {
    toast.loading("Deleting supplier...");
    const response = await fetch(`/api/admin/suppliers/${supplier.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast.dismiss();
      toast.success("Supplier deleted successfully");
      mutate(Mutations.SUPPLIERS.FETCH);
    } else {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSupplier;
