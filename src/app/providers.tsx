'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
}

const queryClient = new QueryClient()

export const Providers = ({ children }: Props) => {
  return( 
  
  <QueryClientProvider client={queryClient}>
  
  <SessionProvider>{children}</SessionProvider>

  </QueryClientProvider>


)
}