import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/auth"; // ✅ make sure this path is correct

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // simple email regex validation
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    try {
      setLoading(true);
      const res = await authApi.forgetPassword(email); // ✅ API call
      console.log(res);
      navigate("/email-sent" ,{state:{email:email}});
      toast({
        title: "Reset Link Sent",
        description: `A reset link has been sent to ${email}. Please check your inbox.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setEmail("");
      // ✅ optional redirect after success
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <Link to="/signin">
          <IoMdArrowBack className="text-2xl mb-4 cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full border rounded-md p-2 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </main>
  );
}
