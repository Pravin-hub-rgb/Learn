"use client";
import { registerUser } from "@/app/actions/auth";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, {
    error: "",
    success: false,
  });
  return (
    <div>
      <h1>Register</h1>
      {state.error && <div>{state.error}</div>}
      {state.success && <div>Registration Successfull! Please login</div>}
      <form action={formAction}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
