import React from "react";
import { OauthSignin } from "@/components/auth/oAuthSignin";
import { CredentialSignin } from "@/components/auth/credentialSignin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import Box from "@/components/ui/box";
import Button from "@/components/ui/button";
import Paragraph from "@/components/ui/paragraph";

const SignIn = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Box
        variant="roundedMaxMd"
        className="md:mx-auto md:space-y-12 md:max-w-md max-md:space-y-8"
      >
        <Heading level={1}>ログイン</Heading>
        <OauthSignin className="md:mb-12 mx-auto" />
        <Paragraph color="gray" className="text-center">or</Paragraph>
        <CredentialSignin />
        <Button variant="text" className="mx-auto block">
          <Link href="/signup">アカウント作成はこちら</Link>
        </Button>
      </Box>
    </>
  );
};

export default SignIn;
