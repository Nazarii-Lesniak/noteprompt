import { createClient } from '@/lib/supabase/client';

import { AuthResult, normalizedSignUpError } from './authErrors';

const supabase = createClient();

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export async function signUp({
  name,
  email,
  password,
}: SignUpParams): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback?next=/sign-in`,
      data: {
        name,
      },
    },
  });

  if (error) {
    return {
      success: false,
      code: normalizedSignUpError(error),
      message: error.message,
    };
  }

  if (data.user?.identities?.length === 0) {
    return {
      success: false,
      code: 'email_already_exists',
      message: 'Email already registered',
    };
  }

  return { success: true, data: undefined };
}
