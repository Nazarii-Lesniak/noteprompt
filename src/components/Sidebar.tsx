'use client';

import { useLayoutStore } from '@/store/useLayoutStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useTranslations } from 'next-intl';
import { createChat } from '@/features/chat/api/createChat';

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();
  const user = useAuthStore((state) => state.user);
  const {
    chats,
    chatId: currentChatId,
    setChatId,
    addChat,
    reset: resetChat,
    setChat,
    isStreaming,
  } = useChatStore();
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const t = useTranslations('sidebar');

  if (!user) {
    return null;
  }

  const handleNewChat = async () => {
    if (isCreating || isStreaming) return;
    try {
      setIsCreating(true);
      const newChat = await createChat(t('buttons.newChat'));
      if (newChat) {
        resetChat();
        setChatId(newChat.id);
        addChat(newChat);
      }
    } catch (error) {
      console.error('Failed to create new chat:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase()),
  );

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
        <Button onClick={handleNewChat} disabled={isCreating || isStreaming}>
          {isCreating ? '...' : t('buttons.newChat')}
        </Button>
        <Input
          type="text"
          placeholder={t('inputs.placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="text-slate">{t('labels.quickPrompts')}</label>
        <hr />
        <label className="text-slate">{t('labels.chatHistory')}</label>
        <div className="flex flex-col gap-1 overflow-y-auto flex-1">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setChat(chat.id, []);
              }}
              className={`text-left px-3 py-2 rounded-xl truncate text-sm transition-colors cursor-pointer ${
                currentChatId === chat.id
                  ? 'bg-sky text-slate font-medium'
                  : 'text-slate hover:bg-sky/50'
              }`}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
