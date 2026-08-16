import { Link } from '@/i18n/routing';
import { ComponentProps } from 'react';
import { buttonVariants, type ButtonVariantProps } from './buttons.variants';

type LinkButtonProps = ComponentProps<typeof Link> & ButtonVariantProps;

export function LinkButton({
  variant,
  fullWidth,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={buttonVariants({ variant, fullWidth, className })}
    />
  );
}
