'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FormField } from './FormField';
import { SignInInputs, signInSchema } from '../schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '../api/signIn';

export function SignInForm() {
  const t = useTranslations('signIn');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema(t)),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    const result = await signIn(data);

    if (!result.success) {
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-xs text-slate hover:underline"
        >
          {t('footer.forgotPassword')}
        </Link>
      </div>

      <div>
        <Button type="submit" variant="submit" disabled={isSubmitting}>
          {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
        </Button>
      </div>
    </form>
  );
}
