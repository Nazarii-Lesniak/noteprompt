'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
	const t = useTranslations('nav');
	return (
		<main className="flex min-h-svh flex-col items-center justify-center gap-8 p-6 text-center">
			<h1 className="max-w-md text-3xl font-bold text-slate">
				{t('home.title')}
			</h1>
			<p className="max-w-sm text-slate">{t('home.description')}</p>
		</main>
	);
}
