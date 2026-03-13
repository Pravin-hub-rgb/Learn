'use client'

import { useState } from "react"

export default function SumForm() {
    const [num1, setNum1] = useState<string>("")
    const [num2, setNum2] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([])

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        const newErrors: string[] = []

        if (num1 === "") newErrors.push("Pehla number khaali hai")
        if (num2 === "") newErrors.push("Dusra number khaali hai")
        if (isNaN(Number(num1))) newErrors.push("Pehla number valid nahi hai")
        if (isNaN(Number(num2))) newErrors.push("Dusra number valid nahi hai")

        if (newErrors.length > 0) {
            setErrors(newErrors)
            
            return
        }
        // Sab theek hai — log karo
        setErrors([])
        console.log('Number 1:', Number(num1))
        console.log('Number 2:', Number(num2))
        console.log('Sum:', Number(num1) + Number(num2))
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit} >
                <input onChange={(e) => {setNum1(e.target.value)}} type="text" value={num1} className="border border-blue-500 p-2 m-2 rounded-2xl text-2xl" placeholder="Enter Number 1"/>
                <input onChange={(e) => {setNum2(e.target.value)}} type="text" value={num2} className="border border-blue-500 p-2 m-2 rounded-2xl text-2xl" placeholder="Enter Number 2"/>
                {errors.length > 0 && (
                    <div className="border border-red-500 p-2 rounded-2xl">
                        {errors.map((error, index) => (
                            <p key={index}>{index + 1}: {error}</p>
                        ))}
                    </div>
                )}
                <button type="submit" className="border border-white-500 rounded-2xl text-2xl p-3 m-3">Submit</button>
            </form>
        </div>
    )
}