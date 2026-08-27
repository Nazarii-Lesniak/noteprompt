import { createClient } from '@/lib/supabase/client';

import { AuthResult } from './authErrors';

const supabase = createClient();

export async function signInWithGoogle(): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, code: 'unknown', message: error.message };
  }

  return { success: true, data: undefined };
}
