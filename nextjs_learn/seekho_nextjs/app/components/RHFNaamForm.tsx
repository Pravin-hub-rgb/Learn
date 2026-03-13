'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
    naam: string
}

export default function RHFNaamForm() {
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>()
    function onSubmit(data: { naam: string }) {
        setSubmitted(true)
    }
    if (submitted) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-green-600">Ho gaya</h2>
                <p className="mt-2">Welcome!, {getValues('naam')}</p>
                <button className="mt-4 px-4 py-2 bg-gray-600 rounded cursor-pointer" onClick={()=>{
                    setSubmitted(false)
                }}>Dobara Karo</button>
            </div>
        )
    }
    return (
        <div className="p-10 max-w-sm border border-gray-100 rounded-2xl">
            <h2 className="text-xlfont-bold mb-6">Apna Naam Daalo!</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Naam</label>
                    <input
                        type="text"
                        placeholder="Naam Likho"
                        className={`w-full px-3 py-2 border rounded outline-none ${errors.naam ? 'border-red-500' : 'border-gray-300'}`}
                        {...register("naam", {
                            required: 'Naam Zaroori hai',
                            minLength: {
                                value: 2,
                                message: 'Naam kam se kam 2 characters ka hona chahiye!'
                            }
                        })}
                    />
                    {errors.naam && (
                        <p className="text-sm text-red-400 mt-1">{errors.naam.message as string}</p>
                    )}
                </div>
                <button type="submit" className="w-full py02 bg-blue-600 text-white rounded cursor-ponter hover:bg-blue-700">Submit Karo!</button>
            </form>
        </div>
    )
}