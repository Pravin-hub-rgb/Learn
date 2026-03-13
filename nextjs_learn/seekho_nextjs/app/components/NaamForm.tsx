'use client'

import { useState } from "react"
import z from "zod"

const schema = z.object({
    naam: z.string().min(1, "Naam likha zaroori hai").min(2, "Naam kam se kam 2 character ka toh hona chahiye")
})

export default function NaamForm() {
    const [naam, setNaam] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [submitted, setSubmitted] = useState<boolean>(false)

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        const result = schema.safeParse({ naam })
        if(!result.success)
        {
            setError(result.error.issues[0].message)
            return
        }
        setError("")
        setSubmitted(true)
    }
    if(submitted)
    {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-green-600">✅ Hogaya!</h2>
                <p className="mt-2">Welcome <strong>{naam}</strong>!</p>
                <button className="mt-4 px-4 bg-gray-600 rounded cursor-pointer" onClick={()=>{
                    setSubmitted(false)
                    setError("")
                    setNaam("")
                }}>Dobara Karo</button>
            </div>
        )
    }
    return (
        <div className="p-10 max-w-sm">
            <h2 className="text-xl font-bold mb-6">Apna Naam Daalo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Naam:</label>
                    <input
                        type="text"
                        placeholder="Naam Likho"
                        className={`w-full px-3 py-2 border rounded outline-none 
                            ${error ? 'border-red-500': 'border-gray-500'}`}
                        value={naam}
                        onChange={(e) => {
                            setNaam(e.target.value)
                        }}
                    />
                    {error && (
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                    )}
                </div>
                <button
                    className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg:blue-700"
                    type="submit"
                >
                    Submit Karo
                </button>
            </form>
            <p className="mt-4 text-gray-500">Abhi Likha {naam}</p>
        </div>
    )
}