import { useEffect, useState, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/auth";
import { useToast } from "@chakra-ui/react";

export default function RegisterEmailVerify() {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || '';

  // ✅ define resend function properly with useCallback
  const sendVerifyMail = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authApi.emailVarify(email);
      console.log(res);
      toast({
        title: "Email verification sent",
        description: `We have sent a verification email to ${email}. If you didn’t receive it, click the button below.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Email verification failed",
        description: error || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

     setTimeout(() => {
         navigate("/signup");
      }, 3000);

    } finally {
      setLoading(false);
    }
  }, [email, toast]);

  // ✅ run on mount if email exists
  useEffect(() => {
    if (email) {
      sendVerifyMail();
    }
  }, [email, sendVerifyMail]);

  if (!email)       
    {
  setTimeout(() => {
    navigate("/signup");
  }, 5000);

    return (
      <div className="flex justify-center items-center h-screen w-full text-red-400 text-2xl font-semibold">
        Email not present
      </div>
    );
  }

  return (
    <main className="flex h-screen w-full bg-[#F5F7FA]">
      <div className="text-center m-auto p-8 rounded-2xl bg-white shadow-md max-w-[450px]">
        <MdEmail className="text-5xl mx-auto text-purple-800" />
        <h2 className="mt-5 text-xl font-medium text-gray-800">
          Email Verification
        </h2>
        <p className="text-xs text-[#797E82]">
          We have sent you an email verification to{" "}
          <span className="font-medium text-black">{email}</span>. If you didn’t
          receive it, click the button below.
        </p>
        <button
          onClick={sendVerifyMail}
          disabled={loading}
          className="mt-5 w-full py-2 px-4 border border-purple-800 rounded-md shadow-sm text-sm font-medium text-purple-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Resend Verification Email"}
        </button>
      </div>
    </main>
  );
}
