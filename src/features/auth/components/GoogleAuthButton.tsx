"use client";

import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

interface GoogleAuthButtonProps {
  variant?: "signIn" | "signUp";
}

export function GoogleAuthButton({
  variant = "signUp",
}: GoogleAuthButtonProps) {
  const tSignUp = useTranslations("signUp.buttons");
  const tSignIn = useTranslations("signIn.buttons");

  const buttonText =
    variant === "signIn"
      ? tSignIn("signInWithGoogle")
      : tSignUp("signUpWithGoogle");

  const handleGoogleAuth = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button type="button" variant="signupWithGoogle" onClick={handleGoogleAuth}>
      {buttonText}
    </Button>
  );
}
