'use client'

import { useState } from "react"

export default function SimpleInput()
{
    const [nameInput, setNameInput] = useState<string>("")
    return (
        <div>
            <input onChange={(e) => {setNameInput(e.target.value)}} className="border text-2xl" type="text" value={nameInput} />
            <p>{nameInput}</p>
        </div>
    )
}