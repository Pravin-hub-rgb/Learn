'use client'
import { useState } from "react"
import z from "zod"

const schema = z.object({
    naam: z.string()
        .min(1, "Naam likha zaroori hai")
        .min(2, "Naam kam se kam 2 characters ka hona chahiye"),

    email: z.email("Valid Email Likho"),

    password: z.string()
        .min(1, "Password likha zaroori hai")
        .min(6, "Password kam se kam 6 characters ka hona chahiye")
})

export default function ZodForm() {
    const [form, setForm] = useState({
        naam: "",
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        naam: "",
        email: "",
        password: ""
    })

    const [submitted, setSubmitted] = useState(false)

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        console.log(form);
        const result = schema.safeParse(form)
        if (!result.success) {
            const newErrors = { naam: "", email: "", password: "" }

            result.error.issues.forEach(issue => {
                const field = issue.path[0]
                if (field === 'naam') newErrors.naam = issue.message
                if (field === 'email') newErrors.email = issue.message
                if (field === 'password') newErrors.password = issue.message
            });
            setErrors(newErrors)
            return
        }
        setErrors({ naam: "", email: "", password: "" })
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="border border-green-400 p-2 m-2">
                <h2 className="text-xl text-center">Form Submitted Successfully!</h2>
                <p>Name: {form.naam}</p>
                <p>Email: {form.email}</p>
                <button onClick={() => {
                    setSubmitted(false)
                    setForm({ naam: '', email: '', password: '' })
                    setErrors({ naam: '', email: '', password: '' })
                }} className="border rounded-2xl p-2 m-2 cursor-pointer">Dobara Karo</button>
            </div>
        )
    }

    return (
        <div className="border rounded-2xl p-5 m-2">
            <h2 className="text-center text-blue-400 font-bold text-2xl ">Register Karo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block mt-4 text-sm font-medium">Naam</label>
                    <input
                        type="text"
                        placeholder="Aapka Naam"
                        className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
                        value={form.naam}
                        onChange={(e) => {
                            setForm({ ...form, naam: e.target.value })
                            setErrors({ ...errors, naam: "" })
                        }}
                    />
                    {errors.naam && (
                        <p className="text-red-400 mt-1">{errors.naam}</p>
                    )}
                </div>
                <div>
                    <label className="block mt-4 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Aapki Email"
                        className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
                        value={form.email}
                        onChange={(e) => {
                            setForm({ ...form, email: e.target.value })
                            setErrors({ ...errors, email: "" })
                        }
                        }
                    />
                    {errors.email && (
                        <p className="text-red-400 mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label className="block mt-4 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name=""
                        id=""
                        className="w-full px-3 py-2 border border-gray-300 rounded outline-none"
                        value={form.password}
                        onChange={(e) => {
                            setForm({ ...form, password: e.target.value })
                            setErrors({ ...errors, password: "" })
                        }}
                    />
                    {errors.email && (
                        <p className="text-red-400 mt-1">{errors.password}</p>
                    )}
                </div>
                <button
                    className="border rounded-2xl m-2 p-2 cursor-pointer"
                    type="submit"
                >
                    Register Karo
                </button>
            </form>
            {/* Test ke liye — baad mein hatayenge */}
            <p className="mt-4 text-sm text-gray-400">
                naam: {form.naam} | email: {form.email}
            </p>
        </div>
    )
}