"use client";
import PageTitle from "@/components/Layout/Admin/PageTitle";
import ImagePreviewer from "@/components/Modals/ImagePreviewer";
import ResponsiveHoverCard from "@/components/ui/custom/ResponsiveHoverCard";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useScroll from "@/hooks/scroll";
import { Mutations } from "@/lib/Constants";
import React from "react";
import useSWR from "swr";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const fetcher = async () => {
  try {
    const response = await fetch("/api/admin/products");
    if (!response.ok) {
      throw new Error("Failed to fetch suppliers");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
};

const Products = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Product[]>(Mutations.PRODUCTS.FETCH, fetcher);
  const isScrolled = useScroll();

  const [search, setSearch] = React.useState("");
  const [filterProducts, setFilteredProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (products) {
      if (search.trim() !== "") {
        const filtered = products?.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            (product.description &&
              product.description
                .toLowerCase()
                .includes(search.toLowerCase())) ||
            (product.remark &&
              product.remark.toLowerCase().includes(search.toLowerCase())),
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [search, products]);

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center">{error.message}</div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <PageTitle title="Products" subText="Create and manage products">
        <div className="flex justify-center items-center gap-3 mt-4">
          <AddProduct />
          <Input
            placeholder="Search"
            className="max-w-md text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </PageTitle>
      <div
        className={`flex flex-col justify-center ${
          isScrolled ? "mt-28 sm:mt-32" : "mt-5"
        } dark:bg-[#131315] bg-[#f3f3f3] rounded-2xl dark:text-white text-black mb-0 sm:mb-32`}
      >
        <Table className="w-full">
          <TableHeader className="">
            <TableRow>
              {["NAME", "DESCRIPTION", "IMAGE", "REMARK", "ACTION"].map(
                (header, index) => (
                  <TableHead
                    key={index}
                    className="w-[150px] text-center font-bold py-5"
                  >
                    {header}
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterProducts
              ? filterProducts.map((product) => (
                  <TableRow key={product.id} className="text-center">
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      <ResponsiveHoverCard
                        triggerContent={product.description}
                        contentText={product.description || "No description"}
                        triggerClassName="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>
                      {product.image && (
                        <div className="flex items-center justify-center">
                          <ImagePreviewer imageUrl={product.image} />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{product.remark}</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center py-3">
                      <EditProduct product={product} />
                      <DeleteProduct product={product} />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center py-5 px-2">
          <div className="hidden sm:block"></div>
          <span className="text-xs">
            {search.trim() !== ""
              ? `${filterProducts.length} products found`
              : `${filterProducts?.length} products in total`}
          </span>
          <div className="">{/* here will be pagination */}</div>
        </div>
      </div>
    </div>
  );
};
export default Products;
