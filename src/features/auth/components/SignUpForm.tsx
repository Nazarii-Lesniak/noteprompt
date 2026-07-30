'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '@/components/ui/Input';
import { FormField } from './FormField';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

interface Inputs {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export function SignupForm() {
	const t = useTranslations('signup');
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data);
	};
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
							value: /^\S+@\S+$/i,
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
					variant="submit">
					{t('buttons.submit')}
				</Button>
			</div>
		</form>
	);
}
