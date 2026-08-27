import { createClient } from '@/lib/supabase/client';
import { type Message } from '@/types/chat';

export async function getChatMessages(chatId: string): Promise<Message[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }

  return (data || []) as Message[];
}
