'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function SignupForm() {
	const t = useTranslations('signup');

	return (
		<div className="m-auto w-full max-w-md rounded-2xl p-6 bg-sky ">
			<hgroup className="text-center mb-6">
				<h1 className="text-2xl font-semibold text-slate">{t('title')}</h1>
				<p className="text-slate">{t('description')}</p>
			</hgroup>

			<form className="flex flex-col gap-4">
				<div className="flex flex-col">
					<label
						htmlFor="name"
						className="text-slate">
						{t('labels.name')}
					</label>
					<Input
						id="name"
						type="text"
						placeholder={t('placeholders.name')}
					/>
					<p role="alert"></p>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="email"
						className="text-slate">
						{t('labels.email')}
					</label>
					<Input
						id="email"
						type="email"
						placeholder={t('placeholders.email')}
					/>
					<p role="alert"></p>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="password"
						className="text-slate">
						{t('labels.password')}
					</label>
					<Input
						id="password"
						type="password"
						placeholder={t('placeholders.password')}
					/>
					<p role="alert"></p>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="confirmPassword"
						className="text-slate">
						{t('labels.confirmPassword')}
					</label>
					<Input
						id="confirmPassword"
						type="password"
						placeholder={t('placeholders.confirmPassword')}
					/>
					<p role="alert"></p>
				</div>

				<Button
					type="submit"
					variant="submit">
					{t('buttons.submit')}
				</Button>
			</form>

			<div className="flex items-center font-bold text-pearl text-sm before:flex-1 before:border-t-3 before:border-pearl before:mr-3 after:flex-1 after:border-t-3 after:border-pearl after:ml-3 mb-6">
				{t('footer.or')}
			</div>

			<Button
				type="button"
				variant="signupWithGoogle">
				{t('buttons.signUpWithGoogle')}
			</Button>

			<div className="flex items-center gap-2 justify-between">
				<p className="text-slate ">{t('footer.hasAccount')} </p>
				<Link
					href="/login"
					className="text-slate transition-colors duration-300 hover:text-slate-800 hover:underline hover:underline-offset-4 hover:decoration-slate">
					{t('footer.loginLink')}
				</Link>
			</div>
		</div>
	);
}
