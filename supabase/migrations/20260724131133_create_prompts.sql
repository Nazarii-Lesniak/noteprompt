-- Create prompts table
create table public.prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  template text,
  order_index int default 0 not null,
  is_favorite boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security (RLS)
alter table public.prompts enable row level security;

-- Create policy to allow all actions only to the owner of the prompt
create policy "Allow all access to prompt owners"
  on public.prompts
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
