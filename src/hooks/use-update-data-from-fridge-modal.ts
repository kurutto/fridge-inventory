import { putData } from "@/lib/put-data";
import { dataType } from "@/types/types";
import { useRouter } from "next/navigation";

const useUpdateData = () => {
  const router = useRouter();
  const updateItem = async (
    fetchPath: string,
    data: dataType,
    reset: () => void,
    handleOpen:() => void
  ) => {
    try {
      const res = await putData(fetchPath, data);
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message);
      } 
      reset();
      router.refresh();
      handleOpen();
    } catch (err) {
      console.error("Fetch failed:", err);
      alert(`サーバーエラーが発生しました`);
    }
  };
  return { updateItem };
};
export default useUpdateData;
