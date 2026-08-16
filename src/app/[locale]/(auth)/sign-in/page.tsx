import { Separator } from '@/components/ui/Separator';
import { GoogleAuthButton } from '@/features/auth/components/GoogleAuthButton';
import { AuthRedirect } from '@/features/auth/components/AuthRedirect';
import { SignInForm } from '@/features/auth/components/SignInForm';
import { getTranslations } from 'next-intl/server';

export default async function SignInPage() {
  const t = await getTranslations('signIn');

  return (
    <div className="m-auto w-full max-w-md rounded-2xl p-6 bg-sky">
      <hgroup className="text-center mb-2">
        <h1 className="text-2xl font-semibold text-slate">{t('title')}</h1>
        <p className="text-slate">{t('description')}</p>
      </hgroup>

      <SignInForm />

      <div className="mt-2 flex flex-col gap-2">
        <Separator>{t('footer.or')}</Separator>

        <GoogleAuthButton variant="signIn" />

        <AuthRedirect>
          <AuthRedirect.Text>{t('footer.noAccount')}</AuthRedirect.Text>
          <AuthRedirect.Link href="/sign-up">
            {t('footer.signupLink')}
          </AuthRedirect.Link>
        </AuthRedirect>
      </div>
    </div>
  );
}
