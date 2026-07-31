'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';

import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FormField } from './FormField';

interface Inputs {
	email: string;
	password: string;
}

const supabase = createClient();

export function SignInForm() {
	const t = useTranslations('signIn');
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({ mode: 'onTouched' });

	const onSubmit: SubmitHandler<Inputs> = async data => {
		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			setError('email', {
				type: 'server',
				message: t('errors.invalidCredentials'),
			});
			setError('password', {
				type: 'server',
				message: t('errors.invalidCredentials'),
			});
			return;
		}

		router.push('/');
		router.refresh();
	};

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={handleSubmit(onSubmit)}>
			<FormField
				label={t('labels.email')}
				htmlFor="email"
				error={errors.email}>
				<Input
					id="email"
					type="email"
					placeholder={t('placeholders.email')}
					{...register('email', {
						required: t('errors.emailRequired'),
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: t('errors.invalidEmail'),
						},
					})}
				/>
			</FormField>

			<FormField
				label={t('labels.password')}
				htmlFor="password"
				error={errors.password}>
				<Input
					id="password"
					type="password"
					placeholder={t('placeholders.password')}
					{...register('password', {
						required: t('errors.passwordRequired'),
					})}
				/>
			</FormField>

			<div className="flex justify-end">
				<Link
					href="/forgot-password"
					className="text-xs text-slate hover:underline">
					{t('footer.forgotPassword')}
				</Link>
			</div>

			<div>
				<Button
					type="submit"
					variant="submit"
					disabled={isSubmitting}>
					{isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
				</Button>
			</div>
		</form>
	);
}
