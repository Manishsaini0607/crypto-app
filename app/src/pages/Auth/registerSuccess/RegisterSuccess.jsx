import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authApi } from "../../../api/auth";
import { useToast } from "@chakra-ui/react";

export default function RegisterSuccess() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function verifyUser() {
      try {
        const data = await authApi.verifyUser(token);
        setRes(data);
    
        
      } catch (error) {
        toast({
          title: "User verification failed",
          description: error?.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // navigate("/signup");
      } finally {
        setLoading(false);
      }
    }

    verifyUser();
  }, [token, navigate, toast]);

  if (!token) {
    return (
      <div className="mx-auto my-auto text-red-400 text-2xl font-semibold">
        Token not present
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto my-auto text-blue-400 text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex h-screen w-full bg-[#F5F7FA]">
      <div className="text-center m-auto p-8 rounded-2xl bg-white shadow-md max-w-[450px]">
        <IoMdCheckmarkCircle className="text-4xl mx-auto text-green-500" />
        <h2 className="mt-5 text-xl font-medium text-gray-800">
          Successfully Registered
        </h2>
        <p className="text-xs text-[#797E82]">
          Hurray! You have successfully created your account. Enter the app to
          explore all its features.
        </p>
        <Link to="/signin">
          <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-500">
            Enter the app
          </button>
        </Link>
      </div>
    </main>
  );
}
