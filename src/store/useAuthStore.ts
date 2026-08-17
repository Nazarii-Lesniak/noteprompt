import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  initialize: (initialUser?: User | null) => () => void;
  signOut: () => Promise<void>;
}

const supabase = createClient();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session, user: session?.user ?? null }),
  setIsLoading: (isLoading) => set({ isLoading }),

  initialize: (initialUser) => {
    if (initialUser !== undefined) {
      set({ user: initialUser, isLoading: false });
    } else {
      set({ isLoading: true });
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        session,
        user: session?.user ?? null,
        isLoading: false,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        isLoading: false,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isLoading: false });
  },
}));
