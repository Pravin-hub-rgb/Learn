"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput, LoginSchema } from "@/lib/validations/auth";
import { useState } from "react";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({resolver: zodResolver(LoginSchema)});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = (data: LoginInput) => {
    setIsSubmitting(true);
    console.log("Form submitted:", data);
    setIsSubmitting(false);
  };

  return (
    <div className="border-x-4 border-gray-600 p-10 w-170 mx-auto mt-10 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-cyan-600">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email?.message && <p style={{ color: "red" }}>{String(errors.email.message)}</p>}

        </div>

        <div className="m">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button  type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}