import { createClient } from '@/lib/supabase/client';
import { Chat } from '@/types/chat';

export async function getChats(): Promise<Chat[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }

  return (data || []) as Chat[];
}
