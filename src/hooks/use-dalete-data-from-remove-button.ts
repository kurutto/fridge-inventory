import { deleteData } from "@/lib/delete-data";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const useDeleteDataRemoveButton = () => {
  const { update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const router = useRouter();
  const deleteItem = async (
    fetchPath: string,
    nextTimeHideConfirm: boolean | null
  ) => {
    await deleteData(fetchPath);
    if (nextTimeHideConfirm) {
      await update({ deleteConfirm: false });
    }
    setIsOpen(false);
    router.refresh();
  };
  return { isOpen, handleOpen, deleteItem };
};

export default useDeleteDataRemoveButton;
