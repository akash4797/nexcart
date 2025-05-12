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
} from "@/components/ui/table";
import AddSupplier from "./AddSupplier";
import EditSupplier from "./EditSupplier";
import DeleteSupplier from "./DeleteSupplier";
import { Mutations } from "@/lib/Constants";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/Layout/Admin/PageTitle";
import useScroll from "@/hooks/scroll";

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

  const isScrolled = useScroll();
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
            (supplier.address &&
              supplier.address.toLowerCase().includes(search.toLowerCase())) ||
            (supplier.contact &&
              supplier.contact.toLowerCase().includes(search.toLowerCase())) ||
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
      <PageTitle
        title="Suppliers"
        subText="Add suppliers to buy products for retailing and stock them in your
          inventory."
      >
        <div className="flex justify-center items-center gap-3 mt-4">
          <AddSupplier />
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
              {["NAME", "CONTACT", "ADDRESS", "REMARK", "ACTION"].map(
                (header, index) => (
                  <TableHead
                    key={index}
                    className="w-[150px] text-center font-bold py-5"
                  >
                    {header}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers
              ? filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} className="text-center">
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.contact}</TableCell>
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
        <div className="flex justify-between items-center py-5 px-2">
          <div className="hidden sm:block"></div>
          <span className="text-xs">
            {filteredSuppliers.length} suppliers found
          </span>
          <div className="">{/* here will be pagination */}</div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
