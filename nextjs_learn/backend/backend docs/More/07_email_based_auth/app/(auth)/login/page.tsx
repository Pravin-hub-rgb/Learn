"use client";
import { useForm } from "react-hook-form";
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log("Form Submitted with data:", data);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onClick={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
rhf ke he level par requried, etc etc control min passwrod nahi lagaoge??
like regrex hota hai email check ke liye aur empty leave naih ... passwrod min 6 chanaracter requird bhi .. 
phir baad mai .. zod mai kahoge ki yeh sab complex hai toh zod mai simle z.email() aisa aisa

aur type bhi toh hota hai rhf mai joh ki zod replace karke khud usse infer karke type banata hai ... 