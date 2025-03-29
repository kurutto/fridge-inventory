import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useChangeFridgeAccount = () => {
  const { update } = useSession();
  const router = useRouter();
  const changeFridgeAccount = async (fridgeId: string) => {
    await update({ fridgeId: fridgeId });
    router.push(`/member/${fridgeId}`);
  }
  return {changeFridgeAccount}
};
