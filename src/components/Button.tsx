import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
	variant?: 'submit' | 'signupWithGoogle';
}

export function Button({
	children,
	variant = 'submit',
	...props
}: ButtonProps) {
	const baseStyles =
		'cursor-pointer w-full mb-6 font-bold rounded-xl p-2 transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)]';

	const variants = {
		submit: 'text-slate bg-mint hover:shadow-slate',
		signupWithGoogle: 'text-pearl bg-coral hover:shadow-slate',
	};

	return (
		<button
			{...props}
			className={`${baseStyles} ${variants[variant]}`}>
			{children}
		</button>
	);
}
