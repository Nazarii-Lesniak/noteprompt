'use client';

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useTranslations } from 'next-intl';

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
  const { isStreaming, addMessage } = useChatStore();
  const t = useTranslations('chat');

  const isInputDisabled = disabled || isStreaming;
  const canSubmit = value.trim().length > 0 && !isInputDisabled;

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 180);
      textarea.style.height = `${Math.max(newHeight, 44)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();

    if (!trimmed || isInputDisabled) return;

    if (onSend) {
      onSend(trimmed);
    } else {
      addMessage({
        role: 'user',
        content: trimmed,
        created_at: new Date().toISOString(),
      });
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
          title={isStreaming ? 'Генерація відповіді...' : t('send')}
          className="py-3 px-5 rounded-xl bg-mint text-slate cursor-pointer"
        >
          <span className="w-5 h-5 text-slate font-bold">Send</span>
        </button>
      </div>
    </form>
  );
}
