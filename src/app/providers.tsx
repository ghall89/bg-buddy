'use client';

import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

import AuthContextProvider from '@/lib/providers/auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ThemeProvider attribute="class">
        <SessionProvider>
          <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </AuthContextProvider>
        </SessionProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
