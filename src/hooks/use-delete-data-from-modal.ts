import { deleteData } from "@/lib/delete-data"
import { useRouter } from "next/navigation";

const useDeleteData =  () => {
  const router = useRouter()
  const deleteItem = async(fetchPath:string,handleOpen:() => void) => {
    deleteData(fetchPath);
    router.refresh();
    handleOpen();
  }
  return {deleteItem}
}

export default useDeleteData;