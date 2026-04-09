"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput, LoginSchema } from "@/lib/validations/auth";
import { useActionState, useState, startTransition } from "react";
import { loginUser } from "@/app/actions/auth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: CSerrors },
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });
  const [state, formAction, isPending] = useActionState(loginUser, {
    error: "",
    success: false,
  });
  const onSubmit = (data: LoginInput) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="border-x-4 border-gray-600 p-10 w-170 mx-auto mt-10 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-cyan-600">
        Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="border-y border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full px-3 py-1"
          />
          {CSerrors.email?.message && (
            <p style={{ color: "red" }}>{String(CSerrors.email.message)}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="border-y border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full px-3 py-1"
          />
          {CSerrors.password && (
            <p style={{ color: "red" }}>{CSerrors.password.message}</p>
          )}
        </div>
        {state.error && (
          <div className="text-red-500 mt-4 text-center">{state.error}</div>
        )}
        <button
          className={`w-full py-2 px-4 rounded-md text-white cursor-pointer ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"}`}
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
