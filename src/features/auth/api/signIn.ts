import { createClient } from '@/lib/supabase/client';

import { AuthResult } from './authErrors';

const supabase = createClient();

interface SignInParams {
  email: string;
  password: string;
}

export async function signIn({
  email,
  password,
}: SignInParams): Promise<AuthResult> {
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
