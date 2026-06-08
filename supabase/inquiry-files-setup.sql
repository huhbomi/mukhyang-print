-- 상담문의 첨부파일: inquiry-files 버킷 + inquiry_files 테이블
-- Supabase Dashboard > SQL Editor 에서 실행하세요.
-- service role key 없이 anon/auth 클라이언트 + Storage/DB RLS 로 동작합니다.

-- 1) 첨부파일 메타데이터 테이블
create table if not exists public.inquiry_files (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.inquiries(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_size bigint,
  mime_type text,
  created_at timestamptz not null default now()
);

create index if not exists inquiry_files_inquiry_id_idx
  on public.inquiry_files (inquiry_id);

alter table public.inquiry_files enable row level security;

-- anon: 업로드(INSERT) 허용 — 문의 등록 직후 클라이언트에서 메타데이터 저장
drop policy if exists "inquiry_files_anon_insert" on public.inquiry_files;
create policy "inquiry_files_anon_insert"
  on public.inquiry_files
  for insert
  to anon, authenticated
  with check (true);

-- authenticated(관리자): 조회/삭제
drop policy if exists "inquiry_files_admin_select" on public.inquiry_files;
create policy "inquiry_files_admin_select"
  on public.inquiry_files
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

drop policy if exists "inquiry_files_admin_delete" on public.inquiry_files;
create policy "inquiry_files_admin_delete"
  on public.inquiry_files
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 2) Storage 버킷: inquiry-files (비공개)
insert into storage.buckets (id, name, public)
values ('inquiry-files', 'inquiry-files', false)
on conflict (id) do nothing;

-- anon/authenticated: 해당 문의 폴더에 업로드 허용
-- 경로 형식: {inquiryId}/{timestamp}-{filename}
drop policy if exists "inquiry_files_storage_insert" on storage.objects;
create policy "inquiry_files_storage_insert"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'inquiry-files'
    and (storage.foldername(name))[1] is not null
  );

-- authenticated(관리자): 조회/삭제
drop policy if exists "inquiry_files_storage_admin_select" on storage.objects;
create policy "inquiry_files_storage_admin_select"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'inquiry-files'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

drop policy if exists "inquiry_files_storage_admin_delete" on storage.objects;
create policy "inquiry_files_storage_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'inquiry-files'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- 비밀번호 인증 후 첨부파일 목록 조회 (RLS 우회 RPC)
create or replace function public.get_inquiry_files(
  p_id uuid,
  p_password text
)
returns table (
  id uuid,
  inquiry_id uuid,
  file_name text,
  file_path text,
  file_size bigint,
  mime_type text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from get_inquiry_detail(p_id, p_password) as d
  ) then
    return;
  end if;

  return query
  select
    f.id,
    f.inquiry_id,
    f.file_name,
    f.file_path,
    f.file_size,
    f.mime_type,
    f.created_at
  from public.inquiry_files f
  where f.inquiry_id = p_id
  order by f.created_at asc;
end;
$$;

-- anon: 비밀번호 확인 API 이후 signed URL / 삭제를 위한 Storage 접근
drop policy if exists "inquiry_files_storage_anon_select" on storage.objects;
create policy "inquiry_files_storage_anon_select"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'inquiry-files');

drop policy if exists "inquiry_files_storage_anon_delete" on storage.objects;
create policy "inquiry_files_storage_anon_delete"
  on storage.objects
  for delete
  to anon
  using (bucket_id = 'inquiry-files');

-- 비밀번호 인증 후 첨부파일 삭제 RPC
create or replace function public.delete_inquiry_file_with_password(
  p_inquiry_id uuid,
  p_password text,
  p_file_id uuid
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  target_path text;
begin
  if not exists (
    select 1 from get_inquiry_detail(p_inquiry_id, p_password) as d
  ) then
    return null;
  end if;

  select file_path into target_path
  from public.inquiry_files
  where id = p_file_id and inquiry_id = p_inquiry_id;

  if target_path is null then
    return null;
  end if;

  delete from public.inquiry_files
  where id = p_file_id and inquiry_id = p_inquiry_id;

  return target_path;
end;
$$;

-- 참고:
-- - 업로드: 브라우저 getSupabaseClient() (anon) → storage.upload + inquiry_files.insert
-- - 일반 사용자 조회: API 비밀번호 확인 → get_inquiry_files RPC + signed URL
-- - 관리자 조회/삭제: authenticated + profiles.role = 'admin'
