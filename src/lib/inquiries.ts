import { getSupabaseClient } from "@/lib/supabase";
import type {
  AdminReply,
  AnswerStatus,
  InquiryDetail,
  InquiryListItem,
} from "@/types/inquiries";

const LIST_VIEW_SELECT =
  "id, inquiry_type, title, writer, created_at, is_private, answer_status";

export const INQUIRY_DETAIL_SESSION_KEY = (id: string) =>
  `mukhyang-inquiry-detail-${id}`;

/** RPC·sessionStorage 응답에서 password 필드 제거 */
export function sanitizeInquiryDetail(
  row: Record<string, unknown>
): InquiryDetail {
  const { password: _password, ...detail } = row;
  return detail as InquiryDetail;
}

export async function fetchInquiryList(): Promise<InquiryListItem[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("inquiry_list_view")
    .select(LIST_VIEW_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as InquiryListItem[];
}

/**
 * 비밀번호 확인 후 상세 조회 (RLS 우회 RPC).
 * inquiries 테이블 직접 select 사용하지 않음.
 */
export async function fetchInquiryDetailByPassword(
  id: string,
  password: string
): Promise<InquiryDetail | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("get_inquiry_detail", {
    p_id: id,
    p_password: password,
  });

  if (error) {
    throw error;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return sanitizeInquiryDetail(data[0] as Record<string, unknown>);
}

export function saveInquiryDetailToSession(
  id: string,
  detail: InquiryDetail
): void {
  sessionStorage.setItem(
    INQUIRY_DETAIL_SESSION_KEY(id),
    JSON.stringify(detail)
  );
}

/** 일반 사용자 상세: sessionStorage에 저장된 RPC 결과만 사용 */
export function readInquiryDetailFromSession(id: string): InquiryDetail | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(INQUIRY_DETAIL_SESSION_KEY(id));
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return sanitizeInquiryDetail(parsed);
  } catch {
    return null;
  }
}

export async function fetchInquiryExists(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("inquiry_list_view")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export function formatInquiryDate(createdAt: string): string {
  return createdAt.slice(0, 10);
}

export function getAnswerStatus(
  item: Pick<InquiryListItem, "answer_status">
): AnswerStatus {
  if (item.answer_status === "답변완료" || item.answer_status === "답변대기") {
    return item.answer_status;
  }
  return "답변대기";
}

/** 일반 사용자: 비밀번호 확인 페이지, 관리자: 상세 바로 이동 */
export function getInquiryHref(id: string, isAdmin: boolean): string {
  if (isAdmin) {
    return `/inquiry/${id}`;
  }
  return `/inquiry/${id}/password`;
}

export function mapAdminReply(inquiry: InquiryDetail): AdminReply | undefined {
  if (!inquiry.admin_reply?.trim()) {
    return undefined;
  }

  return {
    date: inquiry.admin_reply_at
      ? formatInquiryDate(inquiry.admin_reply_at)
      : "—",
    content: inquiry.admin_reply,
  };
}
