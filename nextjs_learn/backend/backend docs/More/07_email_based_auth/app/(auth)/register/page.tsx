"use client";
import { registerUser } from "@/app/actions/auth";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/lib/validations/auth";

type RegistratonFormData = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: CSerrors },
  } = useForm<RegistratonFormData>({
    resolver: zodResolver(registrationSchema),
  });
  const [state, formAction, isPending] = useActionState(registerUser, {
    error: "",
    success: false,
  });
  const onSubmit = (data: RegistratonFormData) => {
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
        Register Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email:
          </label>
          <input
            className="border-y border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full px-3 py-1"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            {...register("email")}
          />
          {/* Client-side error */}
          {CSerrors.email && (
            <span className="text-red-500">{CSerrors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password:
          </label>
          <input
            className="border-y border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full px-3 py-1"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            {...register("password")}
          />
          {/* Client-side error */}
          {CSerrors.password && (
            <span className="text-red-500">{CSerrors.password.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 rounded-md text-white cursor-pointer ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"}`}
        >
          {isPending ? "Registering..." : "Register"}
        </button>
        {/* Server-side error */}
        {state?.error && <div className="text-red-500 ">{state.error}</div>}
        {state?.success && (
          <div className="text-green-500">
            <p>{state.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
