import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

export function Input({ ...props }: InputProps) {
	const baseStyles =
		'bg-pearl text-slate rounded-xl p-2 transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2';

	return (
		<input
			{...props}
			className={baseStyles}
		/>
	);
}
