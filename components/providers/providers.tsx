'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: any) {
    return(
    <ThemeProvider attribute="class">
        <SessionProvider>
            {children}
        </SessionProvider>
    </ThemeProvider>
    )
}