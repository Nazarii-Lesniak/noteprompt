'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';
import { mockMessages } from '@/mocks/mock.chat';

export default function MessageList() {
  const { messages, isStreaming } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('chat');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 max-w-5xl mx-auto overflow-y-auto p-4 space-y-4`}
    >
      {messages.length === 0 ? (
        <div className="h-full min-h-75 flex flex-col items-center justify-center text-center p-6 text-slate">
          <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center text-slate">
            <span className="w-7 h-7 text-slate font-bold content-center">
              NP
            </span>
          </div>
          <h3 className="text-lg font-semibold text-slate mb-1">
            {t('emptyTitle')}
          </h3>
          <p className="text-sm max-w-sm text-slate/80">
            {t('emptyDescription')}
          </p>
        </div>
      ) : (
        messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isLastMessage = index === messages.length - 1;
          const isGeneratingThis = isLastMessage && isStreaming && !isUser;

          return (
            <div
              key={message.id || index}
              className={`flex items-end gap-2.5 max-w-[90%] md:max-w-[80%] ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  isUser
                    ? 'bg-slate text-pearl'
                    : 'bg-mint text-slate border border-sky'
                }`}
              >
                {isUser ? (
                  <span className="flex justify-center font-bold">U</span>
                ) : (
                  <span className="w-8 flex justify-center font-bold">B</span>
                )}
              </div>

              <div
                className={`px-4 py-3 rounded-2xl text-sm md:text-base  text-slate rounded-bl-xs border border-mint whitespace-pre-wrap wrap-break-word ${
                  isUser ? 'bg-mint' : 'bg-white/70'
                }`}
              >
                <Markdown>{message.content}</Markdown>
                {isGeneratingThis && (
                  <span className="inline-block w-1.5 h-4 ml-1.5 align-middle bg-slate/70 animate-pulse" />
                )}
              </div>
            </div>
          );
        })
      )}

      {isStreaming &&
        messages.length > 0 &&
        messages.at(-1)?.role === 'user' && (
          <div className="flex items-end gap-2.5 mr-auto max-w-[80%]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-mint text-slate border border-sky">
              <span className="w-4 h-4">B</span>
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-xs bg-white/70 border border-sky text-slate flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-slate animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-slate animate-bounce" />
            </div>
          </div>
        )}

      <div ref={messagesEndRef} />
    </div>
  );
}
