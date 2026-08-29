import MessageList from '@/features/chat/components/MessageList';
import ChatInput from '@/features/chat/components/ChatInput';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <MessageList />
      <ChatInput />
    </main>
  );
}
