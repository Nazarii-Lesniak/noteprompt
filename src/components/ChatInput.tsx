'use client';

import { useState, useRef, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

import { useSendMessage } from '@/hooks/useSendMessage';

export interface ChatInputProps {
  onSend?: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  placeholder,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isStreaming } = useSendMessage();
  const t = useTranslations('chat');

  const isInputDisabled = disabled || isStreaming;
  const canSubmit = value.trim().length > 0 && !isInputDisabled;

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();

    if (!trimmed || isInputDisabled) return;

    if (onSend) {
      onSend(trimmed);
    } else {
      sendMessage(trimmed);
    }

    setValue('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-3 md:p-4 border-t border-mint`}>
      <div className="relative flex items-end gap-2 max-w-3xl mx-auto rounded-2xl bg-white/90 p-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('inputPlaceholder')}
          rows={1}
          disabled={isInputDisabled}
          aria-label={t('inputPlaceholder')}
          className="flex-1 max-h-45 min-h-10 resize-none py-2 px-3 text-slate text-sm md:text-base outline-none"
        />

        <button
          type="submit"
          disabled={!canSubmit}
          aria-label={t('send')}
          className="py-3 px-5 rounded-xl bg-mint text-slate cursor-pointer"
        >
          <span className="w-5 h-5 text-slate font-bold">{t('send')}</span>
        </button>
      </div>
    </form>
  );
}
