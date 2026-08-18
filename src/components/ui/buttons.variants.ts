import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'cursor-pointer font-bold rounded-xl p-2 transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)]',
  {
    variants: {
      variant: {
        submit: 'text-slate bg-mint hover:shadow-slate',
        signUpWithGoogle: 'text-pearl bg-coral hover:shadow-slate',
        signInWithGoogle: 'text-pearl bg-coral hover:shadow-slate',
        navLink: 'text-slate bg-mint hover:shadow-slate',
        signOut: 'text-pearl bg-coral hover:shadow-slate',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'submit',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
