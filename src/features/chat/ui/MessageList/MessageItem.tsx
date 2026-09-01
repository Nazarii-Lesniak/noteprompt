import Markdown from 'react-markdown';
import { Message } from '../../types/chat';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-end gap-4 md:max-w-full transition-opacity duration-300 ${
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
      </div>
    </div>
  );
}
