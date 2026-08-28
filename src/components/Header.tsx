'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Link, useRouter } from '@/i18n/routing';
import { useAuthStore } from '@/store/useAuthStore';
import { useLayoutStore } from '@/store/useLayoutStore';

import LanguageSwitcher from './LanguageSwitcher';
import { buttonVariants } from './ui/buttons.variants';
import { LinkButton } from './ui/LinkButton';
import { Button } from './ui/Button';

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
    <header className="sticky top-0 z-50 border-b-4 border-sky rounded-b-3xl shadow-sm mt-1 bg-pearl/80 backdrop-blur-xs">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <LinkButton
          href={user ? '/' : '/sign-in'}
          variant="primary"
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
                className={buttonVariants({ variant: 'primary' })}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center space-x-2">
          <LanguageSwitcher />
          {user ? (
            <Button onClick={handleSignOut} variant="accent">
              {t('auth.signOut')}
            </Button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: 'primary' })}
              >
                {t('auth.signIn')}
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({ variant: 'primary' })}
              >
                {t('auth.signUp')}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <span className={buttonVariants({ variant: 'primary' })}>
              {t('nav.close')}
            </span>
          ) : (
            <span className={buttonVariants({ variant: 'primary' })}>
              {t('nav.open')}
            </span>
          )}
        </button>
      </div>

      <div
        className={`md:hidden absolute right-0 bg-pearl rounded-2xl border border-sky p-4 border-b-4 shadow-lg transition-transform duration-300 ease-in-out ${
          menuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center px-4 pt-2 pb-3 space-y-2">
          <LanguageSwitcher />
          {user &&
            navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={buttonVariants({ variant: 'primary' })}
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
              className={buttonVariants({ variant: 'accent' })}
            >
              {t('auth.signOut')}
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: 'primary' })}
                onClick={() => setMenuOpen(false)}
              >
                {t('auth.signIn')}
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({ variant: 'primary' })}
                onClick={() => setMenuOpen(false)}
              >
                {t('auth.signUp')}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
