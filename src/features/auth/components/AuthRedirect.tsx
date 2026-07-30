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

AuthRedirect.Text = function AuthRedirectText() {
	const t = useTranslations('signup');
	return <p className="text-slate text-sm">{t('footer.hasAccount')}</p>;
};

interface AuthRedirectLinkProps {
	href: string;
}

AuthRedirect.Link = function AuthRedirectText({ href }: AuthRedirectLinkProps) {
	const t = useTranslations('signup');
	return (
		<Link
			href={href}
			className="text-slate text-sm transition-colors duration-300 hover:text-slate-800 hover:underline hover:underline-offset-4 hover:decoration-slate">
			{t('footer.loginLink')}
		</Link>
	);
};
