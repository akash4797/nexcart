"use client";
import PageTitle from "@/components/Layout/Admin/PageTitle";
import React from "react";
import AddProduct from "./AddProduct";

const Products = () => {
  return (
    <div className="container mx-auto p-5">
      <PageTitle title="Products" subText="Create and manage products">
        <div className="flex justify-center items-center gap-3 mt-4">
          <AddProduct />
        </div>
      </PageTitle>
    </div>
  );
};
export default Products;
