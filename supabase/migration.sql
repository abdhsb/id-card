-- ID Card Maker: schema for storing saved cards
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query).

create table if not exists public.id_cards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  theme_id text not null default 'sultan-orange',
  theme_name text not null default 'Amber Gold',
  theme_dark text not null default '#15130f',
  theme_dark_soft text not null default '#231d16',
  theme_accent text not null default '#e8790f',
  theme_accent_soft text not null default '#ff9d33',
  theme_gold text not null default '#f0c869',
  background_pattern text not null default 'beans',

  logo_url text,
  company_name text not null default '',
  company_subtitle text not null default '',
  role_title text not null default '',
  employee_name text not null default '',
  photo_url text,
  footer_company text not null default '',
  footer_tagline text not null default '',
  footer_address text not null default '',

  auth_title text not null default '',
  employee_id_label text not null default '',
  employee_id text not null default '',
  access_zones_label text not null default '',
  access_zones text not null default '',
  valid_until_label text not null default '',
  valid_until text not null default '',
  emergency_label text not null default '',
  emergency_phone text not null default '',
  footer_note text not null default '',
  qr_value text not null default ''
);

-- in case the table already existed from an earlier version of this migration
alter table public.id_cards add column if not exists background_pattern text not null default 'beans';
alter table public.id_cards add column if not exists theme_name text not null default 'Amber Gold';
alter table public.id_cards add column if not exists theme_dark text not null default '#15130f';
alter table public.id_cards add column if not exists theme_dark_soft text not null default '#231d16';
alter table public.id_cards add column if not exists theme_accent text not null default '#e8790f';
alter table public.id_cards add column if not exists theme_accent_soft text not null default '#ff9d33';
alter table public.id_cards add column if not exists theme_gold text not null default '#f0c869';

-- keep updated_at fresh on every update
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists id_cards_set_updated_at on public.id_cards;
create trigger id_cards_set_updated_at
  before update on public.id_cards
  for each row execute function public.set_updated_at();

-- Row Level Security.
-- This app has no login system and talks to Supabase with the public anon
-- key, so these policies allow anyone with the anon key to read/write.
-- That is fine for a personal/demo tool but means don't put sensitive data
-- in here for a public-facing deployment without adding real auth first.
alter table public.id_cards enable row level security;

drop policy if exists "public read access" on public.id_cards;
create policy "public read access" on public.id_cards
  for select using (true);

drop policy if exists "public insert access" on public.id_cards;
create policy "public insert access" on public.id_cards
  for insert with check (true);

drop policy if exists "public update access" on public.id_cards;
create policy "public update access" on public.id_cards
  for update using (true);

drop policy if exists "public delete access" on public.id_cards;
create policy "public delete access" on public.id_cards
  for delete using (true);

-- Storage bucket for employee photos and company logos.
insert into storage.buckets (id, name, public)
values ('id-card-assets', 'id-card-assets', true)
on conflict (id) do nothing;

drop policy if exists "public read id-card-assets" on storage.objects;
create policy "public read id-card-assets" on storage.objects
  for select using (bucket_id = 'id-card-assets');

drop policy if exists "public upload id-card-assets" on storage.objects;
create policy "public upload id-card-assets" on storage.objects
  for insert with check (bucket_id = 'id-card-assets');

drop policy if exists "public update id-card-assets" on storage.objects;
create policy "public update id-card-assets" on storage.objects
  for update using (bucket_id = 'id-card-assets');

drop policy if exists "public delete id-card-assets" on storage.objects;
create policy "public delete id-card-assets" on storage.objects
  for delete using (bucket_id = 'id-card-assets');
