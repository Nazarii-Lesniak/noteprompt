import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface AuthRedirectProps {
	children: React.ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
	return (
		<div className="flex items-center gap-1 justify-between">{children}</div>
	);
}

interface AuthRedirectTextProps {
	children?: React.ReactNode;
}

AuthRedirect.Text = function AuthRedirectText({
	children,
}: AuthRedirectTextProps) {
	const t = useTranslations('signUp');
	return (
		<p className="text-slate text-sm">{children ?? t('footer.hasAccount')}</p>
	);
};

interface AuthRedirectLinkProps {
	href: string;
	children?: React.ReactNode;
}

AuthRedirect.Link = function AuthRedirectLink({
	href,
	children,
}: AuthRedirectLinkProps) {
	const t = useTranslations('signUp');
	return (
		<Link
			href={href}
			className="text-slate text-sm transition-colors duration-300 hover:text-slate-800 hover:underline hover:underline-offset-4 hover:decoration-slate">
			{children ?? t('footer.signInLink')}
		</Link>
	);
};
