import { putData } from "@/lib/put-data";
import { DataType, SessionUpdateDataType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useUpdateAccount = () => {
  const router = useRouter();
  const { update } = useSession();
  const updateAccount = async (
    fetchPath: string,
    data: DataType,
    setError: (name: "id", error: { type: string; message?: string | undefined; }) => void,
    handleEdit: (edit: boolean) => void,
    sessionUpdateData:SessionUpdateDataType
  ) => {
    try {
      const res = await putData(fetchPath, data);
      const resData = await res.json();
      if (!res.ok) {
        if (resData.errorId === "INVALID_ID") {
          setError("id", {
            type: "server",
            message: "このIDはすでに使われています",
          });
        } else {
          const errData = await res.json();
          alert(errData.message);
        }
      } else {
        handleEdit(false);
        await update(sessionUpdateData);
        router.refresh();
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      alert(`サーバーエラーが発生しました`);
    }
  };
  return {updateAccount}
};
