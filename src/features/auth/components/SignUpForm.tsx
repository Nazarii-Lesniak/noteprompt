'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FormField } from './FormField';

interface Inputs {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const supabase = createClient();

export function SignUpForm() {
	const [isSuccess, setIsSuccess] = useState(false);

	const t = useTranslations('signUp');
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({ mode: 'onTouched' });

	const onSubmit: SubmitHandler<Inputs> = async data => {
		const { data: authData, error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				emailRedirectTo: `${window.location.origin}/sign-in`,
				data: {
					name: data.name,
				},
			},
		});

		if (error) {
			const isEmailExists =
				error.message.toLowerCase().includes('already') || error.status === 422;

			setError('email', {
				type: 'server',
				message: isEmailExists
					? t('success.emailAlreadyExists')
					: error.message,
			});
			return;
		}

		const userIdentities = authData?.user?.identities;

		if (userIdentities && userIdentities.length === 0) {
			setError('email', {
				type: 'manual',
				message: t('success.emailAlreadyExists'),
			});
			return;
		}

		setIsSuccess(true);
	};

	if (isSuccess) {
		return (
			<div className="text-center p-4 bg-green-50 text-slate rounded-md">
				<p>{t('success.ok')}</p>
			</div>
		);
	}

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={handleSubmit(onSubmit)}>
			<FormField
				label={t('labels.name')}
				htmlFor="name"
				error={errors.name}>
				<Input
					id="name"
					type="text"
					placeholder={t('placeholders.name')}
					{...register('name', { required: t('errors.nameRequired') })}
				/>
			</FormField>

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
						minLength: {
							value: 8,
							message: t('errors.passwordTooShort'),
						},
						deps: ['confirmPassword'],
					})}
				/>
			</FormField>

			<FormField
				label={t('labels.confirmPassword')}
				htmlFor="confirmPassword"
				error={errors.confirmPassword}>
				<Input
					id="confirmPassword"
					type="password"
					placeholder={t('placeholders.confirmPassword')}
					{...register('confirmPassword', {
						required: t('errors.passwordRequired'),
						validate: value =>
							value === getValues('password') ||
							t('errors.passwordsDoNotMatch'),
					})}
				/>
			</FormField>

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
