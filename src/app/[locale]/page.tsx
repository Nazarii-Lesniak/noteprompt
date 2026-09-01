import MessageList from '@/features/chat/ui/MessageList/MessageList';
import ChatInput from '@/features/chat/ui/ChatInput/ChatInput';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <MessageList />
      <ChatInput />
    </main>
  );
}
