"use client";
import { resetPassword } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  ResetPasswordInput,
} from "@/lib/validations/auth";

export default function ResetPasswordPage() {
  const token = useSearchParams().get("token");
  const [state, formAction, isPending] = useActionState(resetPassword, null);
  const {
    register,
    handleSubmit,
    formState: { errors: CSerrors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const onSubmit = (data: ResetPasswordInput) => {
    const formData = new FormData();
    formData.append("token", token || "");
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    startTransition(() => {
      formAction(formData);
    });
  };
  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
        <p className="text-red-500">Invalid or expired reset link</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Reset Password</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={token} {...register("token")} />
        <div>
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            {...register("password")}
            required
            className="w-full px-3 py-2 border rounded"
          />
          {CSerrors.password && (
            <span className="text-red-500">{CSerrors.password.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-2">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            required
            className="w-full px-3 py-2 border rounded"
          />
          {CSerrors.confirmPassword && (
            <span className="text-red-500">
              {CSerrors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={isPending}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
