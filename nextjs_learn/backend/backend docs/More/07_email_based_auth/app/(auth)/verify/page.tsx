"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/app/actions/auth";
import Link from "next/link";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  // Token nahi hai? Seedha error state set karo (useEffect ke bahar)
  // status === "loading" check zaroori hai taaki infinite loop na ho
  if (!token && status === "loading") {
    setStatus("error");
    setMessage("No verification token provided");
  }

  useEffect(() => {
    // Agar token nahi hai toh useEffect run hi mat karo
    if (!token) return;

    const verifyToken = async () => {
      const result = await verifyEmail(token);
      
      if (result.success) {
        setStatus("success");
        setMessage("Email verified successfully!");
      } else {
        setStatus("error");
        setMessage(result.error || "Verification failed");
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="border-x-4 border-gray-600 p-10 w-170 mx-auto mt-10 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-cyan-600">
        Email Verification
      </h1>

      {status === "loading" && (
        <div className="text-center">
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <p className="text-green-600 mb-4">{message}</p>
          <Link 
            href="/login" 
            className="text-cyan-600 hover:underline"
          >
            Go to Login
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <p className="text-red-500 mb-4">{message}</p>
          <Link 
            href="/register" 
            className="text-cyan-600 hover:underline"
          >
            Register Again
          </Link>
        </div>
      )}
    </div>
  );
}