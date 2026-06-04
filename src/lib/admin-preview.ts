/**
 * UI 분기 테스트용 플래그.
 * true: 로그인 없이 관리자 UI 표시
 * false: /admin/login 로그인 후에만 관리자 UI 표시 (Supabase Auth 연동 전)
 */
export const ADMIN_PREVIEW_MODE = false;

/** Supabase Auth 연동 전까지 문의 게시판 관리자 우회 비활성화 */
export const INQUIRY_ADMIN_ENABLED = false;

export const ADMIN_SESSION_KEY = "mukhyang-is-admin";
