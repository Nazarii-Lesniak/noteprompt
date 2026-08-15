'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslations } from 'next-intl';
import { LINK_BASE_CLASS } from '../app/constants/styles';

export default function Header() {
  const toggleSidebar = useLayoutStore((store) => store.toggleSidebar);
  const user = useAuthStore((store) => store.user);
  const signOut = useAuthStore((store) => store.signOut);

  const t = useTranslations();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/prompts', label: t('nav.prompts') },
    { href: '/settings', label: t('nav.settings') },
  ];

  return (
    <header className="relative border-b-4 border-sky rounded-full shadow-sm mt-1">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`${LINK_BASE_CLASS} text-xl text-slate bg-mint hover:shadow-slate`}
          onClick={toggleSidebar}
        >
          NotePrompt
        </Link>

        {user && (
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${LINK_BASE_CLASS} text-md text-slate bg-mint hover:shadow-slate`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden md:flex items-center space-x-2">
          {user ? (
            <button
              onClick={signOut}
              className={`${LINK_BASE_CLASS} text-pearl bg-coral hover:shadow-slate`}
            >
              {t('auth.signOut')}
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={`${LINK_BASE_CLASS} text-slate bg-mint hover:shadow-slate`}
              >
                {t('auth.signIn')}
              </Link>
              <Link
                href="/sign-up"
                className={`${LINK_BASE_CLASS} text-slate bg-mint hover:shadow-slate`}
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
            <span
              className={`${LINK_BASE_CLASS} text-xl text-slate bg-mint hover:shadow-slate`}
            >
              {t('nav.close')}
            </span>
          ) : (
            <span
              className={`${LINK_BASE_CLASS} text-xl text-slate bg-mint hover:shadow-slate`}
            >
              {t('nav.open')}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] w-[50dvw] right-10 md:hidden bg-pearl rounded-2xl shadow-lg border border-sky p-4 border-b-4">
          <nav className="flex flex-col items-center px-4 pt-2 pb-3 space-y-2">
            {user &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${LINK_BASE_CLASS} text-xl text-slate bg-mint hover:shadow-slate`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className={`${LINK_BASE_CLASS} text-xl text-pearl bg-coral hover:shadow-slate`}
              >
                {t('auth.signOut')}
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={`${LINK_BASE_CLASS} text-xl text-slate bg-mint hover:shadow-slate`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t('auth.signIn')}
                </Link>
                <Link
                  href="/sign-up"
                  className={`${LINK_BASE_CLASS} text-xl text-slate bg-mint hover:shadow-slate`}
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
