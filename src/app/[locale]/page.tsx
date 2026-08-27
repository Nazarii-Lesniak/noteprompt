import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <MessageList />
      <ChatInput />
    </main>
  );
}
