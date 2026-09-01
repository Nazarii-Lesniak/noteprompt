import { ChangeEvent, KeyboardEvent, RefObject } from 'react';

export interface ChatInputTextareaProps {
  message: string;
  placeholder: string;
  isInputDisabled: boolean;

  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function ChatInputTextarea({
  message,
  placeholder,
  isInputDisabled,

  textareaRef,
  onChange,
  onKeyDown,
}: ChatInputTextareaProps) {
  const handleInput = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      value={message}
      ref={textareaRef}
      placeholder={placeholder}
      disabled={isInputDisabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={handleInput}
      className="w-full content-center scrollbar-thin max-h-45 resize-none py-2 px-3 text-slate text-sm md:text-base outline-none"
    />
  );
}
