'use client';
import React from 'react';
import { SessionProvider } from "next-auth/react"

export function SessionAuthProvider({ children }: { children: React.ReactNode }) {
  
  return (
    <SessionProvider  basePath="/api/auth">
      {children}
    </SessionProvider>
  );
}