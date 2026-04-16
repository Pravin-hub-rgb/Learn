"use client"

import {use, useContext} from "react"
import { ThemeContext } from "@/context/theme.context"
export default function ThemeButton() {
    const state = useContext(ThemeContext)
    return (
        <div>
            <p>Theme: {state.theme}</p>
            <p>Font Size: {state.fontSize}</p>
        </div>
    )
}