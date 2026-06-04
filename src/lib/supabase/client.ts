import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

let supabaseClient: SupabaseClient | undefined;

/**
 * Supabase 클라이언트 (Client / Server 공통)
 * @supabase/supabase-js createClient 사용
 */
export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  const { url, anonKey } = getSupabaseEnv();
  supabaseClient = createClient(url, anonKey);

  return supabaseClient;
}
