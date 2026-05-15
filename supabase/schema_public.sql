create extension if not exists pgcrypto;

create table if not exists public.team_profiles (
  id bigint primary key,
  user_id uuid not null unique,
  name text not null,
  role text not null,
  avatar text not null default '',
  specialty text not null default '',
  color text not null default '#e50914',
  stats jsonb not null default '{}'::jsonb,
  radar jsonb not null default '[]'::jsonb,
  monthly_posts jsonb not null default '[]'::jsonb,
  email text not null unique,
  avatar_url text not null default '',
  bio text not null default ''
);

create table if not exists public.goals (
  id bigint primary key,
  sort_order bigint not null default 0,
  data jsonb not null
);

create table if not exists public.ideas (
  id bigint primary key,
  sort_order bigint not null default 0,
  data jsonb not null
);

create table if not exists public.calendar_events (
  id bigint primary key,
  sort_order bigint not null default 0,
  data jsonb not null
);

create table if not exists public.history_events (
  id bigint primary key,
  sort_order bigint not null default 0,
  data jsonb not null
);

create table if not exists public.story_logs (
  id bigint primary key,
  sort_order bigint not null default 0,
  data jsonb not null
);

create table if not exists public.posts (
  id bigint primary key,
  sort_order bigint not null default 0,
  data jsonb not null
);

create table if not exists public.app_preferences (
  user_id uuid not null,
  key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.team_profiles enable row level security;
alter table public.goals enable row level security;
alter table public.ideas enable row level security;
alter table public.calendar_events enable row level security;
alter table public.history_events enable row level security;
alter table public.story_logs enable row level security;
alter table public.posts enable row level security;
alter table public.app_preferences enable row level security;

drop policy if exists "team_profiles_select_all" on public.team_profiles;
drop policy if exists "team_profiles_insert_all" on public.team_profiles;
drop policy if exists "team_profiles_update_all" on public.team_profiles;
drop policy if exists "team_profiles_delete_all" on public.team_profiles;

drop policy if exists "goals_select_all" on public.goals;
drop policy if exists "goals_insert_all" on public.goals;
drop policy if exists "goals_update_all" on public.goals;
drop policy if exists "goals_delete_all" on public.goals;

drop policy if exists "ideas_select_all" on public.ideas;
drop policy if exists "ideas_insert_all" on public.ideas;
drop policy if exists "ideas_update_all" on public.ideas;
drop policy if exists "ideas_delete_all" on public.ideas;

drop policy if exists "calendar_events_select_all" on public.calendar_events;
drop policy if exists "calendar_events_insert_all" on public.calendar_events;
drop policy if exists "calendar_events_update_all" on public.calendar_events;
drop policy if exists "calendar_events_delete_all" on public.calendar_events;

drop policy if exists "history_events_select_all" on public.history_events;
drop policy if exists "history_events_insert_all" on public.history_events;
drop policy if exists "history_events_update_all" on public.history_events;
drop policy if exists "history_events_delete_all" on public.history_events;

drop policy if exists "story_logs_select_all" on public.story_logs;
drop policy if exists "story_logs_insert_all" on public.story_logs;
drop policy if exists "story_logs_update_all" on public.story_logs;
drop policy if exists "story_logs_delete_all" on public.story_logs;

drop policy if exists "posts_select_all" on public.posts;
drop policy if exists "posts_insert_all" on public.posts;
drop policy if exists "posts_update_all" on public.posts;
drop policy if exists "posts_delete_all" on public.posts;

drop policy if exists "app_preferences_select_own" on public.app_preferences;
drop policy if exists "app_preferences_insert_own" on public.app_preferences;
drop policy if exists "app_preferences_update_own" on public.app_preferences;
drop policy if exists "app_preferences_delete_own" on public.app_preferences;

create policy "team_profiles_select_all"
on public.team_profiles
for select
using (true);

create policy "team_profiles_insert_all"
on public.team_profiles
for insert
with check (true);

create policy "team_profiles_update_all"
on public.team_profiles
for update
using (true)
with check (true);

create policy "team_profiles_delete_all"
on public.team_profiles
for delete
using (true);

create policy "goals_select_all"
on public.goals
for select
using (true);

create policy "goals_insert_all"
on public.goals
for insert
with check (true);

create policy "goals_update_all"
on public.goals
for update
using (true)
with check (true);

create policy "goals_delete_all"
on public.goals
for delete
using (true);

create policy "ideas_select_all"
on public.ideas
for select
using (true);

create policy "ideas_insert_all"
on public.ideas
for insert
with check (true);

create policy "ideas_update_all"
on public.ideas
for update
using (true)
with check (true);

create policy "ideas_delete_all"
on public.ideas
for delete
using (true);

create policy "calendar_events_select_all"
on public.calendar_events
for select
using (true);

create policy "calendar_events_insert_all"
on public.calendar_events
for insert
with check (true);

create policy "calendar_events_update_all"
on public.calendar_events
for update
using (true)
with check (true);

create policy "calendar_events_delete_all"
on public.calendar_events
for delete
using (true);

create policy "history_events_select_all"
on public.history_events
for select
using (true);

create policy "history_events_insert_all"
on public.history_events
for insert
with check (true);

create policy "history_events_update_all"
on public.history_events
for update
using (true)
with check (true);

create policy "history_events_delete_all"
on public.history_events
for delete
using (true);

create policy "story_logs_select_all"
on public.story_logs
for select
using (true);

create policy "story_logs_insert_all"
on public.story_logs
for insert
with check (true);

create policy "story_logs_update_all"
on public.story_logs
for update
using (true)
with check (true);

create policy "story_logs_delete_all"
on public.story_logs
for delete
using (true);

create policy "posts_select_all"
on public.posts
for select
using (true);

create policy "posts_insert_all"
on public.posts
for insert
with check (true);

create policy "posts_update_all"
on public.posts
for update
using (true)
with check (true);

create policy "posts_delete_all"
on public.posts
for delete
using (true);

create policy "app_preferences_select_own"
on public.app_preferences
for select
using (true);

create policy "app_preferences_insert_own"
on public.app_preferences
for insert
with check (true);

create policy "app_preferences_update_own"
on public.app_preferences
for update
using (true)
with check (true);

create policy "app_preferences_delete_own"
on public.app_preferences
for delete
using (true);
