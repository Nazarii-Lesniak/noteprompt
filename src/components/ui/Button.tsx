import { ComponentProps } from 'react';

import { buttonVariants } from './buttons.variants';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'accent';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, fullWidth: false })}>
      {children}
    </button>
  );
}
