-- Leads captured from the Masterclass landing page.
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text not null,
  source text not null default 'masterclass-landing',
  fbp text,
  fbc text,
  ip text,
  user_agent text,
  page_url text,
  last_event_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Keep `updated_at` in sync on upserts/updates.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute procedure public.set_updated_at();

-- Row Level Security: writes happen only through the service-role key in the
-- Next.js API route, so public clients must not be able to read or write.
alter table public.leads enable row level security;

drop policy if exists "no public access" on public.leads;
create policy "no public access"
  on public.leads
  for all
  to anon, authenticated
  using (false)
  with check (false);
