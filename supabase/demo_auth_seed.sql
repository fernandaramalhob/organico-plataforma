-- Great Orgânico / demo auth seed
-- Run this after supabase/schema.sql to provision the 3 demo accounts.

create extension if not exists pgcrypto;

insert into auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  (
    '4b8a4d0f-6f9e-4c3d-9a1d-2e1f4d58d101',
    'authenticated',
    'authenticated',
    'brendarayssa2706@gmail.com',
    crypt('Great2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"Brenda"}'::jsonb,
    now(),
    now()
  ),
  (
    '2c1b7d5f-88a4-4b7b-8cb5-7d8a6f5c2b02',
    'authenticated',
    'authenticated',
    'hannahleticia13@gmail.com',
    crypt('Great2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"Hannah"}'::jsonb,
    now(),
    now()
  ),
  (
    '7d8a2c11-0f4e-4e7b-b0a9-3f9d77a1c303',
    'authenticated',
    'authenticated',
    'thiagomarquesdev23@hotmail.com',
    crypt('Great2026!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"Thiago"}'::jsonb,
    now(),
    now()
  )
on conflict (email) do update
set
  id = excluded.id,
  encrypted_password = excluded.encrypted_password,
  email_confirmed_at = excluded.email_confirmed_at,
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = excluded.updated_at;

insert into public.team_profiles (
  id,
  user_id,
  name,
  role,
  avatar,
  specialty,
  color,
  stats,
  radar,
  monthly_posts,
  email,
  avatar_url,
  bio
)
values
  (
    1,
    '4b8a4d0f-6f9e-4c3d-9a1d-2e1f4d58d101',
    'Brenda',
    'Video Maker',
    'B',
    'Gravação, edição e reels',
    '#833AB4',
    '{"postsCreated":42,"avgEngagement":7.8,"goalsCompleted":5,"performance":91,"punctuality":94}'::jsonb,
    '[{"subject":"Criatividade","value":92},{"subject":"Pontualidade","value":94},{"subject":"Qualidade","value":90},{"subject":"Engajamento","value":88},{"subject":"Produtividade","value":86}]'::jsonb,
    '[{"month":"Jan","posts":8},{"month":"Fev","posts":9},{"month":"Mar","posts":11},{"month":"Abr","posts":14}]'::jsonb,
    'brendarayssa2706@gmail.com',
    '',
    'Gravação, edição e reels'
  ),
  (
    2,
    '2c1b7d5f-88a4-4b7b-8cb5-7d8a6f5c2b02',
    'Hannah',
    'Designer de Social',
    'H',
    'Artes estáticas e stories',
    '#E1306C',
    '{"postsCreated":38,"avgEngagement":6.9,"goalsCompleted":4,"performance":88,"punctuality":96}'::jsonb,
    '[{"subject":"Criatividade","value":89},{"subject":"Pontualidade","value":96},{"subject":"Qualidade","value":91},{"subject":"Engajamento","value":82},{"subject":"Produtividade","value":87}]'::jsonb,
    '[{"month":"Jan","posts":10},{"month":"Fev","posts":8},{"month":"Mar","posts":9},{"month":"Abr","posts":11}]'::jsonb,
    'hannahleticia13@gmail.com',
    '',
    'Artes estáticas e stories'
  ),
  (
    3,
    '7d8a2c11-0f4e-4e7b-b0a9-3f9d77a1c303',
    'Thiago',
    'Designer Editorial',
    'T',
    'Carrosséis e capas',
    '#FCAF45',
    '{"postsCreated":35,"avgEngagement":7.2,"goalsCompleted":4,"performance":86,"punctuality":89}'::jsonb,
    '[{"subject":"Criatividade","value":86},{"subject":"Pontualidade","value":89},{"subject":"Qualidade","value":92},{"subject":"Engajamento","value":84},{"subject":"Produtividade","value":83}]'::jsonb,
    '[{"month":"Jan","posts":7},{"month":"Fev","posts":8},{"month":"Mar","posts":9},{"month":"Abr","posts":11}]'::jsonb,
    'thiagomarquesdev23@hotmail.com',
    '',
    'Carrosséis e capas'
  )
on conflict (id) do update
set
  user_id = excluded.user_id,
  name = excluded.name,
  role = excluded.role,
  avatar = excluded.avatar,
  specialty = excluded.specialty,
  color = excluded.color,
  stats = excluded.stats,
  radar = excluded.radar,
  monthly_posts = excluded.monthly_posts,
  email = excluded.email,
  avatar_url = excluded.avatar_url,
  bio = excluded.bio;
