import { create } from 'zustand';
import { Chat, Message } from '@/types/chat';

export interface ChatState {
  chatId: string | null;
  chats: Chat[];
  messages: Message[];
  isStreaming: boolean;

  setChatId: (chatId: string | null) => void;
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  appendToLastMessage: (chunk: string) => void;
  setChat: (chatId: string | null, messages?: Message[]) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatId: null,
  chats: [],
  messages: [],
  isStreaming: false,

  setChatId: (chatId) => set({ chatId }),
  setChats: (chats) => set({ chats }),
  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats.filter((c) => c.id !== chat.id)],
    })),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  appendToLastMessage: (chunk) =>
    set((state) => {
      const messages = state.messages;
      if (messages.length === 0) {
        return state;
      }
      const lastIndex = messages.length - 1;
      const lastMessage = messages[lastIndex];
      const updatedLastMessage = {
        ...lastMessage,
        content: (lastMessage.content || '') + chunk,
      };

      return {
        messages: [...messages.slice(0, lastIndex), updatedLastMessage],
      };
    }),

  setChat: (chatId, messages = []) =>
    set({
      chatId,
      messages,
      isStreaming: false,
    }),

  reset: () =>
    set({
      chatId: null,
      messages: [],
      isStreaming: false,
    }),
}));
