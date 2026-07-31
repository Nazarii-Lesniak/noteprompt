import { Separator } from '@/components/ui/Separator';
import { GoogleAuthButton } from '@/features/auth/components/GoogleAuthButton';
import { AuthRedirect } from '@/features/auth/components/AuthRedirect';
import { SignupForm } from '@/features/auth/components/SignUpForm';
import { getTranslations } from 'next-intl/server';

export default async function SignupPage() {
	const t = await getTranslations('signup');

	return (
		<div className="m-auto w-full max-w-md rounded-2xl p-6 bg-sky ">
			<hgroup className="text-center mb-2">
				<h1 className="text-2xl font-semibold text-slate">{t('title')}</h1>
				<p className="text-slate">{t('description')}</p>
			</hgroup>

			<SignupForm />

			<div className="mt-2 flex flex-col gap-2">
				<Separator>{t('footer.or')}</Separator>

				<GoogleAuthButton />

				<AuthRedirect>
					<AuthRedirect.Text />
					<AuthRedirect.Link href="/login" />
				</AuthRedirect>
			</div>
		</div>
	);
}
