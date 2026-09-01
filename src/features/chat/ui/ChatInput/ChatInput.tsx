'use client';

import {
  useState,
  useRef,
  SubmitEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react';
import { useTranslations } from 'next-intl';

import { useSendMessage } from '@/features/chat/hooks/useSendMessage';
import ChatInputTextarea from './ChatInputTextarea';
import ChatInputButton from './ChatInputButton';

export default function ChatInput() {
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { sendMessage, isStreaming } = useSendMessage();
  const t = useTranslations('chat');

  const canSubmit = message.trim().length > 0 && !isStreaming;

  const submitData = () => {
    const trimmed = message.trim();

    if (!trimmed || isStreaming) {
      return;
    }

    sendMessage(trimmed);
    setMessage('');
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitData();
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    submitData();
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-mint">
      <div className="flex items-center gap-2 max-w-3xl mx-auto rounded-2xl bg-white/90 p-2">
        <ChatInputTextarea
          message={message}
          isInputDisabled={isStreaming}
          textareaRef={textareaRef}
          placeholder={t('inputPlaceholder')}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <ChatInputButton canSubmit={canSubmit} sendText={t('send')} />
      </div>
    </form>
  );
}
