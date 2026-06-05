import { getSupabaseClient } from "@/lib/supabase";
import type {
  AdminReply,
  AnswerStatus,
  InquiryDetail,
  InquiryListItem,
  InquiryUpdatePayload,
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

/** RPC 응답을 InquiryDetail로 변환 (배열·단일 객체 모두 지원) */
function parseInquiryDetailRpcData(data: unknown): InquiryDetail | null {
  if (Array.isArray(data) && data.length > 0) {
    return sanitizeInquiryDetail(data[0] as Record<string, unknown>);
  }

  if (data && typeof data === "object" && "id" in data) {
    return sanitizeInquiryDetail(data as Record<string, unknown>);
  }

  return null;
}

/** 관리자 상세 조회 (Supabase Auth session + RPC) */
export async function fetchInquiryDetailAdmin(
  id: string
): Promise<InquiryDetail | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("get_inquiry_detail_admin", {
    p_id: id,
  });

  if (error) {
    throw error;
  }

  return parseInquiryDetailRpcData(data);
}

/** 관리자 답변 등록 — update_inquiry_admin_reply RPC */
export async function saveInquiryAdminReply(
  id: string,
  adminReply: string
): Promise<InquiryDetail | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("update_inquiry_admin_reply", {
    p_id: id,
    p_admin_reply: adminReply,
  });

  if (error) {
    throw error;
  }

  const detail = parseInquiryDetailRpcData(data);

  if (detail) {
    return detail;
  }

  // RPC가 true 등만 반환하는 경우 상세 재조회
  if (data === true) {
    return fetchInquiryDetailAdmin(id);
  }

  return null;
}

/** 관리자 답변 삭제 — delete_inquiry_admin_reply RPC */
export async function deleteInquiryAdminReply(
  id: string
): Promise<InquiryDetail | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("delete_inquiry_admin_reply", {
    p_id: id,
  });

  if (error) {
    throw error;
  }

  const detail = parseInquiryDetailRpcData(data);

  if (detail) {
    return detail;
  }

  if (data === true) {
    return fetchInquiryDetailAdmin(id);
  }

  return fetchInquiryDetailAdmin(id);
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

export function removeInquiryDetailFromSession(id: string): void {
  sessionStorage.removeItem(INQUIRY_DETAIL_SESSION_KEY(id));
}

/** RPC: 비밀번호 검증 후 문의 수정. 성공 시 true, 비밀번호 불일치/수정 불가 시 false */
export async function updateInquiryWithPassword(
  id: string,
  password: string,
  payload: InquiryUpdatePayload
): Promise<boolean> {
  const supabase = getSupabaseClient();

  const rpcParams = {
    p_id: id,
    p_password: password,
    p_writer: payload.writer,
    p_phone: payload.phone,
    p_email: payload.email,
    p_inquiry_type: payload.inquiry_type,
    p_title: payload.title,
    p_content: payload.content,
  };

  console.log("[update_inquiry_with_password] RPC 호출 직전", {
    p_id: rpcParams.p_id,
    p_password: rpcParams.p_password,
  });

  const { data, error } = await supabase.rpc("update_inquiry_with_password", rpcParams);

  console.log("[update_inquiry_with_password] RPC 호출 직후", { data, error });

  if (error) {
    console.log("[update_inquiry_with_password] 수정 실패", {
      inquiryId: id,
      password,
      data,
      error,
    });
    throw error;
  }

  if (data === true) {
    return true;
  }

  console.log("[update_inquiry_with_password] 수정 실패", {
    inquiryId: id,
    password,
    data,
    error,
  });
  return false;
}

/** RPC: 비밀번호 검증 후 문의 삭제 */
export async function deleteInquiryWithPassword(
  id: string,
  password: string
): Promise<boolean> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("delete_inquiry_with_password", {
    p_id: id,
    p_password: password,
  });

  if (error) {
    throw error;
  }

  if (data === false || data === null) {
    return false;
  }

  if (Array.isArray(data) && data.length === 0) {
    return false;
  }

  return true;
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

export type InquirySearchType =
  | "all"
  | "title"
  | "writer"
  | "author"
  | "inquiry_type";

export function filterInquiryList(
  items: InquiryListItem[],
  searchType: InquirySearchType | string,
  keyword: string
): InquiryListItem[] {
  const normalizedKeyword = keyword.trim().toLowerCase();

  if (!normalizedKeyword) {
    return items;
  }

  return items.filter((item) => {
    const title = item.title?.toLowerCase() ?? "";
    const writer = item.writer?.toLowerCase() ?? "";
    const inquiryType = item.inquiry_type?.toLowerCase() ?? "";

    if (searchType === "title") {
      return title.includes(normalizedKeyword);
    }

    if (searchType === "writer" || searchType === "author") {
      return writer.includes(normalizedKeyword);
    }

    if (searchType === "inquiry_type") {
      return inquiryType.includes(normalizedKeyword);
    }

    return (
      title.includes(normalizedKeyword) ||
      writer.includes(normalizedKeyword) ||
      inquiryType.includes(normalizedKeyword)
    );
  });
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
