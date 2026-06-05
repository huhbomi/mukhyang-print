-- 에디터 본문 이미지: Storage 버킷 설정
-- Supabase Dashboard > SQL Editor 에서 실행하세요.

-- 버킷: editor-images / Public: ON (본문 이미지 URL 공개 조회)
insert into storage.buckets (id, name, public)
values ('editor-images', 'editor-images', true)
on conflict (id) do nothing;

-- 클라이언트 직접 업로드 차단 (API Route에서 service role로 업로드)
drop policy if exists "editor_images_storage_no_direct_upload" on storage.objects;
create policy "editor_images_storage_no_direct_upload"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'editor-images' and false);

-- 공개 읽기 허용 (상세 페이지 이미지 표시)
drop policy if exists "editor_images_storage_public_read" on storage.objects;
create policy "editor_images_storage_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'editor-images');

-- 참고:
-- - 저장 경로: editor/{timestamp}-{filename}
-- - 업로드 API: POST /api/editor/upload-image
-- - anon 클라이언트 업로드 허용 (Storage RLS)
