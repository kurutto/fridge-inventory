import { dataType } from "@/types/types";

export const putData = async (fetchPath: string, data: dataType) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${fetchPath}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res;
};
