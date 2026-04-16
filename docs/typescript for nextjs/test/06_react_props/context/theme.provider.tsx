"use client"

import { PropsWithChildren } from "react"
import { ThemeContext } from "./theme.context"

export default function ThemeProvider({children}: PropsWithChildren) {
    return (
        <ThemeContext.Provider value={{theme: "dark", fontSize: 16}}>
            {children}
        </ThemeContext.Provider>
    )
}