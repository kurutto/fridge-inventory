import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { OauthSignin } from "@/components/auth/oAuthSignin";
import { CredentialSignup } from "@/components/auth/credentialSignup";
import { nextAuthOptions } from "@/lib/next-auth/options";

const Signup = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <div className="mx-auto max-w-md">
        <OauthSignin />
        <CredentialSignup />
      </div>
    </div>
  );
};

export default Signup;
