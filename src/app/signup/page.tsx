import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { OauthSignin } from "@/components/auth/oAuthSignin";
import { CredentialSignup } from "@/components/auth/credentialSignup";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Heading from "@/components/ui/heading";
import Box from "@/components/ui/box";
import Paragraph from "@/components/ui/paragraph";

const Signup = async () => {
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
        <CredentialSignup />
      </Box>
    </>
  );
};

export default Signup;
