import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

/** API Route에서 Bearer 토큰으로 관리자 인증 */
export async function verifyAdminFromRequest(
  request: Request
): Promise<{ userId: string; accessToken: string } | null> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const accessToken = authHeader.slice(7).trim();

  if (!accessToken) {
    return null;
  }

  const { url, anonKey } = getSupabaseEnv();
  const supabase = createClient(url, anonKey);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return null;
  }

  const authedClient = createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const { data: profile, error: profileError } = await authedClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    return null;
  }

  return { userId: user.id, accessToken };
}

export function createAuthedSupabaseClient(accessToken: string) {
  const { url, anonKey } = getSupabaseEnv();

  return createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}
