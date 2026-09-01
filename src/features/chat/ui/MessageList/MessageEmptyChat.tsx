import { useTranslations } from 'next-intl';

export default function MessageForEmptyChat() {
  const t = useTranslations('chat');

  return (
    <div className="h-full min-h-75 flex flex-col items-center justify-center text-center p-6 text-slate">
      <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center text-slate mb-3">
        <span className="w-7 h-7 text-slate font-bold content-center">NP</span>
      </div>
      <h2 className="text-lg font-semibold text-slate mb-1">
        {t('emptyTitle')}
      </h2>
      <p className="text-sm max-w-sm text-slate/80">{t('emptyDescription')}</p>
    </div>
  );
}
