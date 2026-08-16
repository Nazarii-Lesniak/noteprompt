import { Link } from '@/i18n/routing';

interface AuthRedirectProps {
  children: React.ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  return (
    <div className="flex items-center gap-1 justify-between">{children}</div>
  );
}

interface AuthRedirectTextProps {
  children: React.ReactNode;
}

AuthRedirect.Text = function AuthRedirectText({
  children,
}: AuthRedirectTextProps) {
  return <p className="text-slate text-sm">{children}</p>;
};

interface AuthRedirectLinkProps {
  href: string;
  children: React.ReactNode;
}

AuthRedirect.Link = function AuthRedirectLink({
  href,
  children,
}: AuthRedirectLinkProps) {
  return (
    <Link
      href={href}
      className="text-slate text-sm transition-colors duration-300 hover:text-slate-800 hover:underline hover:underline-offset-4 hover:decoration-slate"
    >
      {children}
    </Link>
  );
};
