interface dataType{
  [key: string]: string | number | boolean | Date | undefined | null

}
export const postData = async(fetchPath:string,data:dataType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${fetchPath}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    const errData = await res.json();
    alert(errData.message);
  } 
}