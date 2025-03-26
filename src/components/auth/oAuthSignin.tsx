"use client";
// import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

const OauthSignin = () => {
  return (
    <div>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full"
      >
        Googleアカウントから
      </button>
    </div>
  );
};

export { OauthSignin };
