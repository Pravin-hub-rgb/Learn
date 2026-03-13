'use client'

import { useState } from "react"

export default function Calculator() {
    const [num1, setNum1] = useState<string>("")
    const [num2, setNum2] = useState<string>("")
    const [op, setOp] = useState<string>("add")
    const [result, setResult] = useState<number>(0)
    const [errors, setErrors] = useState<string[]>([])
    const [show, setShow] = useState(false)


    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault()
        const localErrors: string[] = []
        if (num1 === "") localErrors.push("Num1 is not entered")
        if (num2 === "") localErrors.push("Num2 is not entered")
        if (isNaN(Number(num1))) localErrors.push("Num1 is not valid")
        if (isNaN(Number(num2))) localErrors.push("Num2 is not valid")

        if (localErrors.length > 0) {
            setErrors(localErrors)
            return
        }


        console.log(`${num1}, ${num2}`)

        setShow(true)
        if (op === "add") setResult(Number(num1) + Number(num2))
        if (op === "sub") setResult(Number(num1) - Number(num2))
        if (op === "mul") setResult(Number(num1) * Number(num2))
        if (op === "div") setResult(Number(num1) / Number(num2))
            console.log(`${op}, ${result}`) 

    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <input className="border border-white-500 p-2 m-2 rounded-2xl" type="text" value={num1} onChange={(e) => { setNum1(e.target.value) }} />
                    <select className="border border-white-500 p-2 m-2 rounded-2xl" name="op" id="operatorSelector" onChange={(e) => { setOp(e.target.value) }} >
                        <option value="add">+</option>
                        <option value="sub">-</option>
                        <option value="mul">*</option>
                        <option value="div">/</option>
                    </select>
                    <input className="border border-white-500 p-2 m-2 rounded-2xl" type="text" value={num2} onChange={(e) => { setNum2(e.target.value) }} />
                </div>
                <button className="border border-white-500 p-2 m-2 rounded-2xl cursor-pointer" type="submit">Calculate</button>
            </form>
            <div>
                {
                    errors.length > 0 && (
                        <div>
                            {errors.map((error, i) => (
                                <p key={i}>{error}</p>
                            ))}
                        </div>
                    )
                }
            </div>
            <div>
                {show && (
                    <div>Result: {result}</div>
                )}
            </div>
        </div>
    )
}