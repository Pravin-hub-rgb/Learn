'use client'
import { useState } from "react"
export default function Counter()
{
    const [count, setCount] = useState(0)
    return (
        <div>
            <p className="border border-white-500 rounded-2xl m-2 px-5 py-2">{count}</p>
            <div>
                <button className="border border-white-500 rounded-2xl m-2 px-5 py-2" onClick={()=> {setCount(count + 1)}}>Count +</button>
                <button className="border border-white-500 rounded-2xl m-2 px-5 py-2" onClick={()=> {setCount(count - 1)}}>Count -</button>
            </div>
        </div>
    )
}