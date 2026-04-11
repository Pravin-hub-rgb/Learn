"use client";
import { forgotPassword } from "@/app/actions/auth";
import { useActionState } from "react";

type ForgotPasswordResult = {
  error?: string;
  success?: boolean;
  message?: string;
}

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState<ForgotPasswordResult>(forgotPassword, null);
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
      <form className="space-y-4" action={formAction}>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset Password
          </button>
          {state?.error && <p className="text-red-500">{state.error}</p>}

          {state?.success && <p className="text-green-500">{state.message}</p>}
        </div>
      </form>
    </div>
  );
}
