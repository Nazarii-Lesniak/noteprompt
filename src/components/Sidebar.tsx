'use client';

import { useLayoutStore } from '@/store/useLayoutStore';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useTranslations } from 'use-intl';

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();
  const [search, setSearch] = useState('');
  const t = useTranslations('sidebar');

  return (
    <aside
      className={`fixed inset-y-0 w-full md:w-[40dvh] left-0 backdrop-blur-md border-r-4 rounded-3xl border-sky transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col p-4 gap-2">
        <button
          onClick={toggleSidebar}
          className="cursor-pointer self-end p-2 mb-6 text-slate hover:text-slate-700"
        >
          ✕
        </button>
        <Button>{t('buttons.newChat')}</Button>
        <Input
          type="text"
          placeholder={t('inputs.placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="text-slate">{t('labels.quickPrompts')}</label>
        <hr />
        <label className="text-slate">{t('labels.chatHistory')}</label>
      </div>
    </aside>
  );
}
