'use client'

import { useEffect } from 'react'

export default function TestEffect() {
    useEffect(() => {
        console.log('Effect chala!')
        document.title = 'Mera Naya Title!'  // ✅ sirf browser mein chalega
    }, [])

    return <div>Browser tab dekho!</div>
}