'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    const unsubscribe = useAuthStore.getState().initialize();

    return () => {
      unsubscribe();
    };
  }, []);

  return <>{children}</>;
}
