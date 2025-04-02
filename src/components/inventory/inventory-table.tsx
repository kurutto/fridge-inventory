"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import EditInventoryButton from "./edit-inventory-button";
import { InventoryType } from "@/types/types";
import Button from "../ui/button";

interface InventoryTableProps
  extends Omit<React.ComponentPropsWithoutRef<"table">, "className"> {
  inventories: InventoryType[];
  className?: string;
}
const InventoryTable = ({
  inventories,
  className,
  ...props
}: InventoryTableProps) => {
  const [sortedInventories, setSortedInventories] =
    useState<InventoryType[]>(inventories);
  useEffect(() => {
    setSortedInventories(inventories);
  }, [inventories]);

  const handleSortRemainingAscending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (first.remaining > second.remaining) {
        return -1;
      } else if (second.remaining > first.remaining) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };
  const handleSortRemainingDescending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (first.remaining < second.remaining) {
        return -1;
      } else if (second.remaining < first.remaining) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };
  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableHeader className="text-left">品名</TableHeader>
          <TableHeader className="sm:w-20 max-sm:w-15">
            残数
            <br />
            <Button variant="text" onClick={handleSortRemainingAscending}>
              ↑
            </Button>
            <Button
              variant="text"
              onClick={handleSortRemainingDescending}
              className="ml-0.5"
            >
              ↓
            </Button>
          </TableHeader>
          <TableHeader className="w-10"></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody className="max-h-30">
        {sortedInventories.map((inventory, idx) => (
          <TableRow key={idx}>
            <TableData>{inventory.name}</TableData>
            <TableData className="text-center">{inventory.remaining}</TableData>
            <TableData className="text-center">
              <EditInventoryButton inventory={inventory} />
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryTable;
