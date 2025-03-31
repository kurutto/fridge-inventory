import { ShoppingListType } from "@/types/types";
import List from "../ui/list";
import DeleteListButton from "./delete-list-button";

interface ShoppingListsProps {
  userId:string;
  fridgeId: string;
}

const ShoppingLists = async ({ userId, fridgeId }: ShoppingListsProps) => {
  // let shoppingLists: ShoppingListType[] = [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list`
  );
  const shoppingLists: ShoppingListType[] = await res.json();
  const items = shoppingLists.map((item: ShoppingListType) => (
    <>
      {item.name}
      {item.amount && <span className="text-sm pl-1">{item.amount}</span>}
      <br />
      <span className="text-xs text-gray">
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        })}
        {item.dueDate && <span className="text-xs text-gray pl-0.5">({new Date(item.dueDate).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        })})</span>}
      </span>
      <span className="text-xs text-gray pl-1 leading-1">{item.user?.name}</span>
      {item.userId === userId && <DeleteListButton fridgeId={fridgeId} itemId={item.id} />}
    </>
  ));
  

  return <List items={items} space="none" className="leading-none -mt-2 [&_li]:pr-10 [&_li]:pt-2 [&_li]:relative" />;
};

export default ShoppingLists;
