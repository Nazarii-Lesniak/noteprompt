'use client';

import { useChatStore } from '@/features/chat/store/useChatStore';

import MessageTypingIndicator from './MessageTypingIndicator';
import MessageForEmptyChat from './MessageEmptyChat';
import MessageItem from './MessageItem';
import { useScrollMessage } from '../../hooks/useScrollMessage';

export default function MessageList() {
  const { messages, isStreaming } = useChatStore();
  const { containerRef, handleScroll } = useScrollMessage(
    messages,
    isStreaming,
  );

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
      {messages.length === 0 && <MessageForEmptyChat />}

      {messages.length > 0 &&
        messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isLastMessage = index === messages.length - 1;

          if (!isUser && !message.content && isStreaming && isLastMessage) {
            return null;
          }

          return <MessageItem key={message.id} message={message} />;
        })}

      {showTypingIndicator && <MessageTypingIndicator />}
    </div>
  );
}
