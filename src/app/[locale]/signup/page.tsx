'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SignupForm() {
	const t = useTranslations('signup');

	return (
		<div className="m-auto w-full max-w-md rounded-2xl p-6 bg-sky ">
			<hgroup className="text-center mb-6">
				<h1 className="text-2xl font-semibold text-slate">{t('title')}</h1>
				<p className="text-slate">{t('description')}</p>
			</hgroup>

			<form className="flex flex-col gap-4 mb-6">
				<div className="flex flex-col">
					<label
						htmlFor="name"
						className="text-slate">
						{t('labels.name')}
					</label>
					<input
						id="name"
						placeholder={t('placeholders.name')}
						className="bg-pearl text-slate rounded-xl p-2 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
					/>
					<p role="alert"></p>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="email"
						className="text-slate">
						{t('labels.email')}
					</label>
					<input
						id="email"
						placeholder={t('placeholders.email')}
						className="bg-pearl text-slate rounded-xl p-2 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
					/>
					<p role="alert"></p>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="password"
						className="text-slate">
						{t('labels.password')}
					</label>
					<input
						id="password"
						placeholder={t('placeholders.password')}
						className="bg-pearl text-slate rounded-xl p-2 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
					/>
					<p role="alert"></p>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="confirmPassword"
						className="text-slate">
						{t('labels.confirmPassword')}
					</label>
					<input
						id="confirmPassword"
						placeholder={t('placeholders.confirmPassword')}
						className="bg-pearl text-slate rounded-xl p-2 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
					/>
					<p role="alert"></p>
				</div>

				<button
					type="submit"
					className="cursor-pointer font-bold text-slate bg-mint rounded-xl p-2 transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-sm hover:shadow-slate">
					{t('buttons.submit')}
				</button>
			</form>

			<div className="flex items-center font-bold text-pearl text-sm before:flex-1 before:border-t-3 before:border-pearl before:mr-3 after:flex-1 after:border-t-3 after:border-pearl after:ml-3 my-4">
				{t('footer.or')}
			</div>

			<button
				type="button"
				className="cursor-pointer w-full mb-6 font-bold text-pearl bg-coral rounded-xl p-2 transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-sm hover:shadow-slate">
				{t('buttons.signUpWithGoogle')}
			</button>

			<div className="flex items-center gap-2 justify-between">
				<p className="text-slate ">{t('footer.hasAccount')} </p>
				<Link
					href="/login"
					className="text-slate transition-[filter] duration-300 hover:brightness-1000">
					{t('footer.loginLink')}
				</Link>
			</div>
		</div>
	);
}
