import { ComponentProps } from 'react';
import { buttonVariants } from './buttons.variants';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'submit' | 'signupWithGoogle';
}

export function Button({
  children,
  variant = 'submit',
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, fullWidth: true })}>
      {children}
    </button>
  );
}
