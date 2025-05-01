import React from "react";
import Heading from "@/components/ui/heading";
import ResetPasswordSendMail from "@/components/auth/resetPasswordSendMail";
import ResetPassword from "@/components/auth/resetPassword";

const ResetPasswordPage = async () => {
  return (
    <>
      <Heading level={1}>パスワードのリセット</Heading>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
