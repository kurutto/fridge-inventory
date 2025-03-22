import React from "react";
import { OauthSignin } from "@/components/auth/oAuthSignin";
import { CredentialSignin } from "@/components/auth/credentialSignin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Link from "next/link";

const SignIn = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <div className="mx-auto max-w-md">
        <OauthSignin />
        <CredentialSignin />
        <Link href="/signup">アカウント作成はこちら</Link>
      </div>
    </div>
  );
};

export default SignIn;
