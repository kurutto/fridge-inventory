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
import { categories } from "@/constants/categories";
import { cn } from "@/lib/utils";
import Paragraph from "../ui/paragraph";

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
  const baseStyle = "";
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
  const handleSortNameAscending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) > 0
      ) {
        return -1;
      } else if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) < 0
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };
  const handleSortNameDescending = () => {
    const newList = [...inventories];
    newList.sort((first, second) => {
      if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) > 0
      ) {
        return 1;
      } else if (
        first.kana.localeCompare(second.kana, "ja", { sensitivity: "base" }) < 0
      ) {
        return -1;
      } else {
        return 0;
      }
    });
    setSortedInventories(newList);
  };
  return (
    <>
      {inventories.length === 0 ? (
        <Paragraph className="px-4 py-2">
          右上の<Button variant="add" className="text-s" />ボタンを押して在庫管理品を追加してください。
        </Paragraph>
      ) : (
        <Table className={cn(baseStyle, className)} {...props}>
          <TableHead>
            <TableRow>
              <TableHeader className="text-left">
                品名
                <br />
                <Button
                  variant="angle"
                  angle="up"
                  onClick={handleSortNameAscending}
                />
                <Button
                  variant="angle"
                  angle="down"
                  onClick={handleSortNameDescending}
                  className="ml-2"
                />
              </TableHeader>
              <TableHeader className="sm:w-20 max-sm:w-15">
                残数
                <br />
                <Button
                  variant="angle"
                  angle="up"
                  onClick={handleSortRemainingAscending}
                />
                <Button
                  variant="angle"
                  angle="down"
                  onClick={handleSortRemainingDescending}
                  className="ml-2"
                />
              </TableHeader>
              <TableHeader className="w-10"></TableHeader>
            </TableRow>
          </TableHead>
          <TableBody className="max-h-30">
            {sortedInventories.map((inventory, idx) => (
              <TableRow key={idx}>
                <TableData>
                  {inventory.name}
                  <span className="text-xs text-gray pl-0.5">
                    ({categories[inventory.category]})
                  </span>
                </TableData>
                <TableData className="text-center">
                  {inventory.remaining}
                </TableData>
                <TableData className="text-center">
                  <EditInventoryButton inventory={inventory} />
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default InventoryTable;
