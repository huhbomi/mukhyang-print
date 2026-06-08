import { getSupabaseClient } from "@/lib/supabase";

export type ProfileRole = {
  id: string;
  role: string | null;
};

/**
 * profiles.role === "admin" 이면 true
 * user.id와 profiles.id 일치 여부를 로그로 확인
 */
export async function fetchIsAdmin(userId: string): Promise<boolean> {
  const supabase = getSupabaseClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", userId)
    .maybeSingle();

  console.log("[profiles] 조회 결과", { userId, profile, error });

  if (error) {
    console.error("[profiles] 조회 error", error);
    return false;
  }

  if (profile) {
    console.log("[profiles] id 일치 확인", {
      userId,
      profileId: profile.id,
      idMatches: userId === profile.id,
      role: profile.role,
      isAdmin: profile.role === "admin",
    });
  }

  return profile?.role === "admin";
}
