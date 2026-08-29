import { createClient } from '@/lib/supabase/client';

import { AuthResult } from './authErrors';

interface SignInParams {
  email: string;
  password: string;
}

export async function signIn({
  email,
  password,
}: SignInParams): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      code: 'invalid_credentials',
      message: error.message,
    };
  }

  return { success: true, data: undefined };
}
