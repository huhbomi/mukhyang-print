import { getSupabaseClient } from "@/lib/supabase";
import type {
  Notice,
  NoticeInsert,
  NoticeListItem,
  NoticeUpdate,
} from "@/types/notices";

const LIST_SELECT = "id, title, created_at, is_pinned";
const DETAIL_SELECT =
  "id, title, content, created_at, is_pinned, updated_at";

export function formatNoticeDate(dateString: string): string {
  return dateString.slice(0, 10);
}

export async function fetchNoticeList(): Promise<NoticeListItem[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("notices")
    .select(LIST_SELECT)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as NoticeListItem[];
}

export async function fetchNoticeById(id: string): Promise<Notice | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("notices")
    .select(DETAIL_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as Notice | null) ?? null;
}

async function getAdminAccessToken(): Promise<string | null> {
  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token ?? null;
}

export async function createNoticeApi(
  payload: NoticeInsert
): Promise<Notice> {
  const token = await getAdminAccessToken();

  if (!token) {
    throw new Error("관리자 로그인이 필요합니다.");
  }

  const response = await fetch("/api/notices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as { notice?: Notice; error?: string };

  if (!response.ok) {
    throw new Error(result.error ?? "공지사항 등록에 실패했습니다.");
  }

  if (!result.notice) {
    throw new Error("공지사항 등록에 실패했습니다.");
  }

  return result.notice;
}

export async function updateNoticeApi(
  id: string,
  payload: NoticeUpdate
): Promise<Notice> {
  const token = await getAdminAccessToken();

  if (!token) {
    throw new Error("관리자 로그인이 필요합니다.");
  }

  const response = await fetch(`/api/notices/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as { notice?: Notice; error?: string };

  if (!response.ok) {
    throw new Error(result.error ?? "공지사항 수정에 실패했습니다.");
  }

  if (!result.notice) {
    throw new Error("공지사항 수정에 실패했습니다.");
  }

  return result.notice;
}

export async function deleteNoticeApi(id: string): Promise<void> {
  const token = await getAdminAccessToken();

  if (!token) {
    throw new Error("관리자 로그인이 필요합니다.");
  }

  const response = await fetch(`/api/notices/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(result.error ?? "공지사항 삭제에 실패했습니다.");
  }
}
