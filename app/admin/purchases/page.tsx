"use client";
import React from "react";
import PageTitle from "@/components/Layout/Admin/PageTitle";

const Purchase = () => {
  return (
    <div className="container mx-auto p-5">
      <PageTitle
        title="Purchases"
        subText="Purchase from suppliers and add products to you inventory"
      >
        <div className="flex justify-center items-center gap-3 mt-4"></div>
      </PageTitle>
    </div>
  );
};

export default Purchase;
