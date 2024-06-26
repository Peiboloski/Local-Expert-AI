"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React, { useState } from "react"

import { trpc } from "./client"

function getBaseUrl() {
    if (typeof window !== undefined) {
        return ''
    }

    if (process.env.WEBAPP_URL) {
        return `https://${process.env.VERCEL_URL}`
    }

    return `http://localhost:${process.env.PORT ?? 3000}`
}

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: `${getBaseUrl()}/api/trpc`,
            }),
        ]
    })
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

