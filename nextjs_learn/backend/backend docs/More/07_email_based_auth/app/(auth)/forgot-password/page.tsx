"use client";
import { forgotPassword } from "@/app/actions/auth";
import {
  ForgotPasswordInput,
  ForgotPasswordSchema,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState } from "react";
import { Form, useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPassword, null);
  const {
    register,
    handleSubmit,
    formState: { errors: CSerrors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const onSubmit = (data: ForgotPasswordInput) => {
    const formData = new FormData();
    formData.append("email", data.email);
    startTransition(() => {
      formAction(formData);
    });
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
          />
          {CSerrors.email && (
            <p className="text-red-500 mt-1">{CSerrors.email.message}</p>
          )}
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
