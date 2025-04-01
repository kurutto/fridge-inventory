import { ShoppingListType } from "@/types/types";
import { List, Li } from "../ui/list";
import RemoveFromListButton from "./remove-from-list-button";

interface ShoppingListProps {
  userId: string;
  fridgeId: string;
}

const ShoppingList = async ({ userId, fridgeId }: ShoppingListProps) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list`
  );
  const data: ShoppingListType[] = await res.json();

  return (
    <List space="none" className="leading-[1.1] -mt-2.5">
      {data.map((item, idx) => (
        <Li key={idx} className="relative pr-10 pt-2.5">
          ・{item.name}
          {item.amount && (
            <span className="text-sm pl-1 leading-none">{item.amount}</span>
          )}
          <br />
          <span className="text-xs text-gray">
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
            })}
            {item.dueDate && (
              <span className="text-xs text-gray pl-0.5">
                (
                {new Date(item.dueDate).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                })}
                まで)
              </span>
            )}
          </span>
          <span className="text-xs text-gray pl-1">{item.user?.name}</span>
          {item.userId === userId && (
            <RemoveFromListButton fridgeId={fridgeId} listItemId={item.id} />
          )}
        </Li>
      ))}
    </List>
  );
};

export default ShoppingList;
