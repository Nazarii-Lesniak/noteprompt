'use client';

import { Link, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { LinkButton } from './ui/LinkButton';
import { buttonVariants } from './ui/buttons.variants';

export default function Header() {
  const router = useRouter();
  const toggleSidebar = useLayoutStore((store) => store.toggleSidebar);
  const user = useAuthStore((store) => store.user);
  const signOut = useAuthStore((store) => store.signOut);

  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
    router.refresh();
  };

  const navLinks = [
    { href: '/prompts', label: t('nav.prompts') },
    { href: '/settings', label: t('nav.settings') },
  ];

  return (
    <header className="sticky border-b-4 border-sky rounded-full shadow-sm mt-1">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <LinkButton
          href={user ? '/' : '/sign-in'}
          variant="navLink"
          onClick={user ? toggleSidebar : undefined}
        >
          NotePrompt
        </LinkButton>

        {user && (
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({ variant: 'navLink' })}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center space-x-2">
          <LanguageSwitcher />
          {user ? (
            <button
              onClick={handleSignOut}
              className={buttonVariants({ variant: 'signOut' })}
            >
              {t('auth.signOut')}
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: 'navLink' })}
              >
                {t('auth.signIn')}
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({ variant: 'navLink' })}
              >
                {t('auth.signUp')}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <span className={buttonVariants({ variant: 'navLink' })}>
              {t('nav.close')}
            </span>
          ) : (
            <span className={buttonVariants({ variant: 'navLink' })}>
              {t('nav.open')}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="top-[calc(100%+0.5rem)] w-[50dvw] right-10 md:hidden bg-pearl rounded-2xl shadow-lg border border-sky p-4 border-b-4">
          <nav className="flex flex-col items-center px-4 pt-2 pb-3 space-y-2">
            <LanguageSwitcher />
            {user &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={buttonVariants({ variant: 'navLink' })}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            {user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleSignOut();
                }}
                className={buttonVariants({ variant: 'navLink' })}
              >
                {t('auth.signOut')}
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({ variant: 'navLink' })}
                  onClick={() => setMenuOpen(false)}
                >
                  {t('auth.signIn')}
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({ variant: 'navLink' })}
                  onClick={() => setMenuOpen(false)}
                >
                  {t('auth.signUp')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
