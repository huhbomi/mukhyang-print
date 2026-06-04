/**
 * Supabase 연결 진입점 (Next.js App Router)
 *
 * @example
 * import { getSupabaseClient } from "@/lib/supabase";
 * const supabase = getSupabaseClient();
 *
 * 게시판 데이터 연동은 추후 각 페이지/액션에서 추가 예정
 */

export { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";
export type { SupabaseEnv } from "@/lib/supabase/env";
export { getSupabaseClient } from "@/lib/supabase/client";
