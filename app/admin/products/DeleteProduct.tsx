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
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { mutate } from "swr";
import { Mutations } from "@/lib/Constants";

const DeleteProduct = ({ product }: { product: Product }) => {
  const handleDelete = async () => {
    toast.loading("Deleting product...");
    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast.dismiss();
      toast.success("Product deleted successfully");
      mutate(Mutations.PRODUCTS.FETCH);
    } else {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogOverlay className="backdrop-blur-sm" />
      <AlertDialogTrigger asChild>
        <Button size={"sm"}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to delete this <strong>{product.name}</strong>? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 focus:ring-offset-red-200 transition ease-in-out duration-150"
          >
            DELETE
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
