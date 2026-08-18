export type MessageRole = 'user' | 'assistant';

export interface Message {
  id?: string;
  chat_id?: string;
  role: MessageRole;
  content: string;
  created_at?: string;
}
