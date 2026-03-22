"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "@/lib/validatoins/contact";
import z from "zod";

type ContactFormFields = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormFields>({ resolver: zodResolver(ContactSchema) });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => {
        console.log("valid:", data);
      })}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Naam</label>
        <input
          type="text"
          placeholder="Apna Naam Likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          {...register("naam")}
        />
        {errors.naam && (
          <p className="text-red-500 text-sm mt-1">{errors.naam.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Apni Email Likho"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full"
          {...register("city")}
        >
          <option value="">-- Selct Karo --</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
        </select>
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("terms")}
          className="w-4 h-4"
          id="terms"
        />
        <label className="text-sm" htmlFor="terms">
          Terms aur Conditions accept karta hoon
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm">{errors.terms.message}</p>
      )}
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input type="radio" value="male" {...register("gender")} />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="female" {...register("gender")} />
            Female
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
