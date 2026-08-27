import { createClient } from '@/lib/supabase/client';
import { Chat } from '@/types/chat';

export async function createChat(
  title: string = 'Новий чат',
): Promise<Chat | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('chats')
    .insert({
      user_id: user.id,
      title,
    })
    .select()
    .single();

  if (error || !data) {
    console.error('Error creating chat in Supabase:', error);
    throw error;
  }

  return data;
}
