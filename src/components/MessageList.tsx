'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';

import { useChatStore } from '@/store/useChatStore';

export default function MessageList() {
  const { messages, isStreaming } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef<boolean>(true);
  const t = useTranslations('chat');

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 100;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isAtBottomRef.current) {
      return;
    }

    if (isStreaming) {
      container.scrollTop = container.scrollHeight;
    } else {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isStreaming]);

  const lastMessage = messages[messages.length - 1];
  const showTypingIndicator =
    isStreaming &&
    (lastMessage?.role === 'user' ||
      (lastMessage?.role === 'assistant' && !lastMessage.content));

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 max-w-4xl w-full mx-auto space-y-4 py-4 md:space-y-10"
    >
      {messages.length === 0 ? (
        <div className="h-full min-h-75 flex flex-col items-center justify-center text-center p-6 text-slate">
          <div className="w-14 h-14 rounded-2xl bg-mint flex items-center justify-center text-slate mb-3">
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
          const isGeneratingThis =
            isLastMessage && isStreaming && !isUser && Boolean(message.content);

          if (!isUser && !message.content && isStreaming && isLastMessage) {
            return null;
          }

          return (
            <div
              key={message.id || index}
              className={`flex items-end gap-4 md:max-w-full transition-opacity duration-200 ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  isUser
                    ? 'bg-slate text-pearl'
                    : 'bg-mint text-slate border border-sky'
                }`}
              >
                <span className="font-bold">{isUser ? 'U' : 'B'}</span>
              </div>

              <div
                className={`px-4 py-3 rounded-2xl text-sm md:text-base text-slate border whitespace-pre-wrap wrap-break-word ${
                  isUser
                    ? 'bg-mint border-mint rounded-br-xs'
                    : 'bg-white/70 border-mint rounded-bl-xs'
                }`}
              >
                <div className="inline">
                  <Markdown>{message.content}</Markdown>
                </div>
                {isGeneratingThis && (
                  <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-slate/70 animate-pulse" />
                )}
              </div>
            </div>
          );
        })
      )}

      {showTypingIndicator && (
        <div className="flex items-end gap-2.5 mr-auto max-w-[80%]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-mint text-slate border border-sky shrink-0">
            <span className="font-bold">B</span>
          </div>
          <div className="px-4 py-3 rounded-2xl rounded-bl-xs bg-white/70 border border-sky text-slate flex items-center gap-1.5 h-11">
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
