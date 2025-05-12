"use client";
import React from "react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import AddSupplier from "./AddSupplier";
import EditSupplier from "./EditSupplier";
import DeleteSupplier from "./DeleteSupplier";
import { Mutations } from "@/lib/Constants";
import { Input } from "@/components/ui/input";

const fetcher = async () => {
  try {
    const response = await fetch("/api/admin/suppliers");
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

const Supplier = () => {
  const {
    data: suppliers,
    error,
    isLoading,
  } = useSWR<Supplier[]>(Mutations.SUPPLIERS.FETCH, fetcher);

  const [search, setSearch] = React.useState("");
  const [filteredSuppliers, setFilteredSuppliers] = React.useState<Supplier[]>(
    []
  );

  React.useEffect(() => {
    if (suppliers) {
      if (search.trim() !== "") {
        const filtered = suppliers?.filter(
          (supplier) =>
            supplier.name.toLowerCase().includes(search.toLowerCase()) ||
            supplier.address.toLowerCase().includes(search.toLowerCase()) ||
            (supplier.remark &&
              supplier.remark.toLowerCase().includes(search.toLowerCase()))
        );
        setFilteredSuppliers(filtered);
      } else {
        setFilteredSuppliers(suppliers);
      }
    }
  }, [search, suppliers]);

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <p className="text-sm mt-1">
          Add suppliers to buy products for retailing and stock them in your
          inventory.
        </p>
      </div>
      <div className="flex justify-center items-center gap-3 mt-5">
        <AddSupplier />
        <Input
          placeholder="Search"
          className="max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-5 pb-5 dark:bg-[#131315] bg-[#f3f3f3] rounded-2xl dark:text-white text-black">
        <Table className="w-full">
          <TableCaption>
            {filteredSuppliers.length} suppliers found
          </TableCaption>
          <TableHeader className="">
            <TableRow>
              {["NAME", "ADDRESS", "REMARK", "ACTION"].map((header, index) => (
                <TableHead
                  key={index}
                  className="w-[150px] text-center font-bold py-5"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers
              ? filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} className="text-center">
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell>{supplier.remark}</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center py-3">
                      <EditSupplier supplier={supplier} />
                      <DeleteSupplier supplier={supplier} />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Supplier;
