import { getTranslations } from 'next-intl/server';

import { AuthRedirect } from '@/features/auth/components/AuthRedirect';
import { GoogleAuthButton } from '@/features/auth/components/GoogleAuthButton';
import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { Separator } from '@/components/ui/Separator';

export default async function SignUpPage() {
  const t = await getTranslations('signUp');

  return (
    <div className="m-auto w-full max-w-md rounded-2xl p-6 bg-sky ">
      <hgroup className="text-center mb-2">
        <h1 className="text-2xl font-semibold text-slate">{t('title')}</h1>
        <p className="text-slate">{t('description')}</p>
      </hgroup>

      <SignUpForm />

      <div className="mt-2 flex flex-col gap-2">
        <Separator>{t('footer.or')}</Separator>

        <GoogleAuthButton variant="signUp" />

        <AuthRedirect>
          <AuthRedirect.Text>{t('footer.hasAccount')}</AuthRedirect.Text>
          <AuthRedirect.Link href="/sign-in">
            {t('footer.signInLink')}
          </AuthRedirect.Link>
        </AuthRedirect>
      </div>
    </div>
  );
}
