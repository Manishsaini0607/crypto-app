import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // simple email regex validation
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
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
    // ✅ send request to backend API
    console.log("Reset link sent to:", email);
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-purple-500 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </main>
  );
}
