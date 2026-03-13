'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
    naam: z.string()
        .min(1, "naam zaroori hai")
        .min(2, "Naam kam se kam 2 characters ka hona he chahiye")
})

type FormData = z.infer<typeof schema>

export default function RHFNaamForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    function onSubmit(data: FormData) {
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('naam')} />
                {errors.naam && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.naam.message}
                    </p>
                )}
                <button type="submit">Submit Karo</button>
            </form>
        </div>
    )
}