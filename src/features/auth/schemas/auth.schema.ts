import z from 'zod';

type TranslateFn = (key: string) => string;

const emailSchema = (t: TranslateFn) => z.email(t('errors.invalidEmail'));

export const signInSchema = (t: TranslateFn) =>
  z.object({
    email: emailSchema(t),
    password: z.string().min(1, t('errors.passwordRequired')),
  });

export const signUpSchema = (t: TranslateFn) =>
  z
    .object({
      name: z.string().trim().min(1, t('errors.nameRequired')),
      email: emailSchema(t),
      password: z.string().min(8, t('errors.passwordTooShort')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

export type SignInInputs = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpInputs = z.infer<ReturnType<typeof signUpSchema>>;
