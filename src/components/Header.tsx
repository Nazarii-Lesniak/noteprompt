'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslations } from 'next-intl';

const linkBaseClass =
  'cursor-pointer font-bold rounded-xl p-2 transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1)]';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`${linkBaseClass} text-xl text-slate bg-mint hover:shadow-slate`}
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
                className={`${linkBaseClass} text-md text-slate bg-mint hover:shadow-slate`}
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
              className={`${linkBaseClass} text-pearl bg-coral hover:shadow-slate`}
            >
              {t('auth.signOut')}
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={`${linkBaseClass} text-slate bg-mint hover:shadow-slate`}
              >
                {t('auth.signIn')}
              </Link>
              <Link
                href="/sign-up"
                className={`${linkBaseClass} text-slate bg-mint hover:shadow-slate`}
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
              className={`${linkBaseClass} text-xl text-slate bg-mint hover:shadow-slate`}
            >
              {t('nav.close')}
            </span>
          ) : (
            <span
              className={`${linkBaseClass} text-xl text-slate bg-mint hover:shadow-slate`}
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
                  className={`${linkBaseClass} text-xl text-slate bg-mint hover:shadow-slate`}
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
                className={`${linkBaseClass} text-xl text-pearl bg-coral hover:shadow-slate`}
              >
                {t('auth.signOut')}
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={`${linkBaseClass} text-xl text-slate bg-mint hover:shadow-slate`}
                  onClick={() => setMenuOpen(false)}
                >
                  {t('auth.signIn')}
                </Link>
                <Link
                  href="/sign-up"
                  className={`${linkBaseClass} text-xl text-slate bg-mint hover:shadow-slate`}
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
