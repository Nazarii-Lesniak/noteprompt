'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { createChat } from '@/features/chat/api/createChat';
import { getChatMessages } from '@/features/chat/api/getChatMessages';
import { getChats } from '@/features/chat/api/getChats';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { useLayoutStore } from '@/store/useLayoutStore';

import { Button } from './ui/Button';
import { Input } from './ui/Input';

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();
  const user = useAuthStore((state) => state.user);
  const {
    chats,
    chatId: currentChatId,
    setChats,
    setChatId,
    addChat,
    reset: resetChat,
    setChat,
    isStreaming,
  } = useChatStore();
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const t = useTranslations('sidebar');

  useEffect(() => {
    if (!user) return;
    let isMounted = true;
    setIsLoadingChats(true);
    getChats()
      .then((userChats) => {
        if (isMounted) {
          setChats(userChats);
        }
      })
      .catch((err) => {
        console.error('Failed to load chats from Supabase:', err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingChats(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user, setChats]);

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

  const handleSelectChat = async (chatId: string) => {
    if (isStreaming || isLoadingMessages) return;
    try {
      setIsLoadingMessages(true);
      const messages = await getChatMessages(chatId);
      setChat(chatId, messages);
    } catch (error) {
      console.error('Failed to load messages for chat:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside
      className={`fixed inset-y-0 w-full md:w-72 lg:w-80 left-0 bg-pearl/80 transform-gpu backdrop-blur-xs border-r-4 rounded-3xl border-sky transition-transform duration-300 ease-in-out ${
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

        <div className="flex flex-col flex-1 min-h-0">
          <button
            type="button"
            onClick={() => setIsHistoryOpen((prev) => !prev)}
            className="flex items-center justify-between py-2 text-slate font-medium cursor-pointer select-none hover:text-slate-800"
          >
            <span>{t('labels.chatHistory')}</span>
            <span className="text-xs transition-transform duration-200">
              {isHistoryOpen ? '▲' : '▼'}
            </span>
          </button>

          {isHistoryOpen && (
            <div className="flex flex-col gap-1 overflow-y-auto flex-1 mt-1 pr-1">
              {isLoadingChats ? (
                <p className="text-xs text-slate/70 py-2 text-center">
                  {t('labels.loading')}
                </p>
              ) : filteredChats.length === 0 ? (
                <p className="text-xs text-slate/70 py-2 text-center">
                  {search ? t('labels.noResults') : t('labels.noChats')}
                </p>
              ) : (
                filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    disabled={isLoadingMessages}
                    className={`text-left px-3 py-2 rounded-xl truncate text-sm transition-colors cursor-pointer ${
                      currentChatId === chat.id
                        ? 'bg-sky text-slate font-medium'
                        : 'text-slate hover:bg-sky/50'
                    }`}
                  >
                    {chat.title}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
