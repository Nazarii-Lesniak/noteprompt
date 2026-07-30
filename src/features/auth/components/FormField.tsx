import { FieldError } from 'react-hook-form';

interface FormFieldProps {
	label: string;
	error?: FieldError;
	htmlFor: string;
	children: React.ReactNode;
}

export function FormField({ label, error, htmlFor, children }: FormFieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={htmlFor}
				className="text-slate text-sm">
				{label}
			</label>
			{children}
			<div
				className={`
  grid transition-[grid-template-rows] duration-300 ease-out
  ${error ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
`}>
				<div className="overflow-hidden">
					{error && (
						<p
							id={`${htmlFor}-error`}
							role="alert"
							className="text-sm text-coral pt-1">
							{error.message}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
