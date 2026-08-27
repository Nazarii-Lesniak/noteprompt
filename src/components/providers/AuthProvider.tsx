'use client';

import { type ReactNode, useLayoutEffect } from 'react';

import { useAuthStore } from '@/store/useAuthStore';
import { User } from '@supabase/supabase-js';

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  useLayoutEffect(() => {
    const unsubscribe = useAuthStore.getState().initialize(initialUser);

    return () => {
      unsubscribe();
    };
  }, [initialUser]);

  return <>{children}</>;
}
