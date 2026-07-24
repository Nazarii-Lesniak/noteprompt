-- Create chats table
create table public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security for chats
alter table public.chats enable row level security;

-- Create policy for chats: users can access only their own chats
create policy "Allow all access to chat owners"
  on public.chats
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references public.chats(id) on delete cascade not null,
  role text check (role in ('user', 'assistant')) not null,
  content text not null,
  created_at timestamptz default now() not null
);

-- Enable Row Level Security for messages
alter table public.messages enable row level security;

-- Create policy for messages: users can access messages if they own the parent chat
create policy "Allow all access to messages if user owns parent chat"
  on public.messages
  for all
  using (
    exists (
      select 1 from public.chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );
