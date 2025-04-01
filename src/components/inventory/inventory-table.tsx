import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button";
import { getInventories } from "@/lib/inventory";
import EditInventoryButton from "./edit-inventory-button";

interface InventoryTableProps
extends Omit<React.ComponentPropsWithoutRef<"table">, "className"> {
  fridgeId: string;
  className?: string;
}
const InventoryTable = async({fridgeId, className, ...props}:InventoryTableProps) => {
  const inventories = await getInventories(fridgeId);
  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableHeader className="text-left">品名</TableHeader>
          <TableHeader className="w-20">残数</TableHeader>
          <TableHeader className="w-24"></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody className="max-h-30">
        {inventories.map((inventory,idx)=> (
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
