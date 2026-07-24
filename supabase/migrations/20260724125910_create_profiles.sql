-- Create user profiles table linked 1:1 with Supabase Auth
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Read policy: Users can only view their own profile
create policy "Allow users to read their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Update policy: Users can only edit their own profile
create policy "Allow users to update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);
