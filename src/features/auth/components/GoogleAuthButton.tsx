'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/Button';

import { signInWithGoogle } from '../api/signInWithGoogle';

interface GoogleAuthButtonProps {
  variant?: 'signIn' | 'signUp';
}

export function GoogleAuthButton({
  variant = 'signUp',
}: GoogleAuthButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const tButton = useTranslations(`${variant}.buttons`);
  const tError = useTranslations(`${variant}.errors`);

  const buttonText = tButton(`${variant}WithGoogle`);

  const handleGoogleAuth = async () => {
    setError(null);
    setIsLoading(true);

    const result = await signInWithGoogle();

    if (!result.success) {
      setError(tError(result.code || 'unknown'));
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button
        type="button"
        variant={`${variant}WithGoogle`}
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        {buttonText}
      </Button>
      {error && <p className="text-sm text-coral pt-1">{error}</p>}
    </>
  );
}
