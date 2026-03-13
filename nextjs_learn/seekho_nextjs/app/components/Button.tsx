'use client'
import { useTheme } from "../context/ThemeContext"

export default function Button() {
    const {theme, toggleTheme} = useTheme()
    return (
        <button  onClick={toggleTheme} className={`px-5 py-2 border rounded-md ${theme === 'dark'
                ? 'bg-gray-800 text-white border-gray-600'
                : 'bg-white text-gray-800 border-gray-300'
            }`}>
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

    )
}