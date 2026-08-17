'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { type Locale } from '@/i18n/request';

const LOCALE_LABELS = {
  uk: 'ua',
  en: 'en',
} as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale: Locale = locale === 'uk' ? 'en' : 'uk';

  const handleSwitch = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center rounded-xl border-2 border-mint text-slate text-sm p-1 cursor-pointer transition-colors duration-300 hover:border-sky"
    >
      <span
        className={`px-2 py-1 rounded-lg uppercase ${locale === 'uk' ? 'bg-sky font-bold text-slate' : 'text-slate'}`}
      >
        {LOCALE_LABELS.uk}
      </span>
      <span
        className={`px-2 py-1 rounded-lg uppercase ${locale === 'en' ? 'bg-sky font-bold text-slate' : 'text-slate'}`}
      >
        {LOCALE_LABELS.en}
      </span>
    </button>
  );
}
