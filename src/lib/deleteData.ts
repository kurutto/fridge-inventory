export const deleteData = async (fetchPath: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}${fetchPath}`, {
    method: "DELETE",
  });
};
