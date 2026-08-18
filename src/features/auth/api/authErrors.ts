export type AuthErrorCode =
  | 'invalid_credentials'
  | 'email_already_exists'
  | 'unknown';

export type AuthResult<T = void> =
  | { success: true; data: T }
  | {
      success: false;
      code: AuthErrorCode;
      message: string;
    };

export function normalizedSignUpError(error: {
  message: string;
  status?: number;
}): AuthErrorCode {
  const isEmailExists =
    error.message.toLowerCase().includes('already') || error.status === 422;
  return isEmailExists ? 'email_already_exists' : 'unknown';
}
