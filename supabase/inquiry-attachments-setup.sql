-- 상담문의 첨부파일: Storage 버킷 + DB 테이블 설정
-- Supabase Dashboard > SQL Editor 에서 실행하세요.

-- 1) 첨부파일 메타데이터 테이블
create table if not exists public.inquiry_attachments (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.inquiries(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_size bigint,
  file_type text,
  created_at timestamptz not null default now()
);

create index if not exists inquiry_attachments_inquiry_id_idx
  on public.inquiry_attachments (inquiry_id);

alter table public.inquiry_attachments enable row level security;

-- anon/authenticated 직접 접근 차단 (API Route + service role / RPC 경유)
drop policy if exists "inquiry_attachments_no_public_select" on public.inquiry_attachments;
create policy "inquiry_attachments_no_public_select"
  on public.inquiry_attachments
  for select
  to anon, authenticated
  using (false);

drop policy if exists "inquiry_attachments_no_public_insert" on public.inquiry_attachments;
create policy "inquiry_attachments_no_public_insert"
  on public.inquiry_attachments
  for insert
  to anon, authenticated
  using (false);

drop policy if exists "inquiry_attachments_no_public_delete" on public.inquiry_attachments;
create policy "inquiry_attachments_no_public_delete"
  on public.inquiry_attachments
  for delete
  to anon, authenticated
  using (false);

-- 2) Storage 버킷 (Dashboard > Storage > New bucket 로도 생성 가능)
-- 이름: inquiry-attachments / Public: OFF
insert into storage.buckets (id, name, public)
values ('inquiry-attachments', 'inquiry-attachments', false)
on conflict (id) do nothing;

-- Storage 정책: 클라이언트 직접 업로드/조회 차단 (API Route에서 service role 또는 관리자 토큰 사용)
drop policy if exists "inquiry_attachments_storage_no_public" on storage.objects;
create policy "inquiry_attachments_storage_no_public"
  on storage.objects
  for all
  to anon, authenticated
  using (bucket_id = 'inquiry-attachments' and false);

-- [구버전] 신규 설정은 supabase/inquiry-files-setup.sql 을 사용하세요.
-- 업로드는 클라이언트 anon/auth + Storage RLS, 조회/삭제는 API + RPC 로 처리합니다.
