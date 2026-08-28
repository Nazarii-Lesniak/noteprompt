'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';

import { signUp } from '../api/signUp';
import { SignUpInputs, signUpSchema } from '../schemas/auth.schema';

export function SignUpForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const t = useTranslations('signUp');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema(t)),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const result = await signUp(data);

    if (!result.success) {
      setError('email', {
        type: 'server',
        message:
          result.code === 'email_already_exists'
            ? t('errors.emailAlreadyExists')
            : result.message,
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField label={t('labels.name')} htmlFor="name" error={errors.name}>
        <Input
          id="name"
          type="text"
          placeholder={t('placeholders.name')}
          {...register('name')}
        />
      </FormField>

      <FormField label={t('labels.email')} htmlFor="email" error={errors.email}>
        <Input
          id="email"
          type="email"
          placeholder={t('placeholders.email')}
          {...register('email')}
        />
      </FormField>

      <FormField
        label={t('labels.password')}
        htmlFor="password"
        error={errors.password}
      >
        <Input
          id="password"
          type="password"
          placeholder={t('placeholders.password')}
          {...register('password')}
        />
      </FormField>

      <FormField
        label={t('labels.confirmPassword')}
        htmlFor="confirmPassword"
        error={errors.confirmPassword}
      >
        <Input
          id="confirmPassword"
          type="password"
          placeholder={t('placeholders.confirmPassword')}
          {...register('confirmPassword')}
        />
      </FormField>

      <div>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
        </Button>
      </div>
    </form>
  );
}
