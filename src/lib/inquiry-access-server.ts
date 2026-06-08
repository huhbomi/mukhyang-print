import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  createAuthedSupabaseClient,
  verifyAdminFromRequest,
} from "@/lib/admin-auth-server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export type InquiryAccess =
  | { type: "admin"; accessToken: string }
  | { type: "user"; password: string };

export async function verifyInquiryPasswordServer(
  inquiryId: string,
  password: string
): Promise<boolean> {
  const { url, anonKey } = getSupabaseEnv();
  const supabase = createClient(url, anonKey);

  const { data, error } = await supabase.rpc("get_inquiry_detail", {
    p_id: inquiryId,
    p_password: password,
  });

  if (error) {
    return false;
  }

  if (Array.isArray(data) && data.length > 0) {
    return true;
  }

  if (data && typeof data === "object" && "id" in data) {
    return true;
  }

  return false;
}

export async function verifyInquiryAccess(
  inquiryId: string,
  request: Request
): Promise<InquiryAccess | null> {
  const admin = await verifyAdminFromRequest(request);

  if (admin) {
    return { type: "admin", accessToken: admin.accessToken };
  }

  const password = request.headers.get("X-Inquiry-Password")?.trim();

  if (password && (await verifyInquiryPasswordServer(inquiryId, password))) {
    return { type: "user", password };
  }

  return null;
}

/** API Route에서 권한 확인 후 anon 또는 authenticated 클라이언트 반환 */
export function getAuthedClientForAccess(access: InquiryAccess): SupabaseClient {
  if (access.type === "admin") {
    return createAuthedSupabaseClient(access.accessToken);
  }

  const { url, anonKey } = getSupabaseEnv();
  return createClient(url, anonKey);
}
