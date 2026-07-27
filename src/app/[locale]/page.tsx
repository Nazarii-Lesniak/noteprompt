'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Home() {
	const t = useTranslations('nav');
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-eggshell-100 p-6 text-center dark:bg-blue-slate-900">
			<Image
				className="dark:invert"
				src="/next.svg"
				alt="Next.js logo"
				width={120}
				height={24}
				priority
			/>
			<h1 className="max-w-md text-3xl font-bold tracking-tight text-blue-slate-900 dark:text-eggshell-100">
				{t('home.title')}
			</h1>
			<p className="max-w-sm text-base leading-relaxed text-blue-slate-600 dark:text-icy-aqua-300">
				{t('home.description')}
			</p>
		</main>
	);
}
