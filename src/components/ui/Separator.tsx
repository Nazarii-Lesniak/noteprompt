import React from 'react';

interface SeparatorProps {
	children: React.ReactNode;
}

export function Separator({ children }: SeparatorProps) {
	return (
		<div className="flex items-center font-bold text-pearl text-sm before:flex-1 before:border-t-3 before:border-pearl before:mr-3 after:flex-1 after:border-t-3 after:border-pearl after:ml-3">
			{children}
		</div>
	);
}
