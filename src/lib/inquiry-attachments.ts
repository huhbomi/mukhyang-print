import { getSupabaseClient } from "@/lib/supabase";
import type { InquiryAttachment, InquiryFile } from "@/types/inquiry-attachments";
import {
  INQUIRY_ATTACHMENT_ALLOWED_EXTENSIONS,
  INQUIRY_ATTACHMENT_MAX_SIZE,
  INQUIRY_FILES_BUCKET,
} from "@/types/inquiry-attachments";

export const INQUIRY_ATTACHMENTS_SESSION_KEY = (id: string) =>
  `mukhyang-inquiry-attachments-${id}`;

export const INQUIRY_PASSWORD_SESSION_KEY = (id: string) =>
  `mukhyang-inquiry-password-${id}`;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateAttachmentMeta(
  fileName: string,
  fileSize: number
): string | null {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (
    !INQUIRY_ATTACHMENT_ALLOWED_EXTENSIONS.includes(
      extension as (typeof INQUIRY_ATTACHMENT_ALLOWED_EXTENSIONS)[number]
    )
  ) {
    return `허용되지 않는 파일 형식입니다: ${fileName}`;
  }

  if (fileSize > INQUIRY_ATTACHMENT_MAX_SIZE) {
    return `파일 용량은 10MB 이하여야 합니다: ${fileName}`;
  }

  return null;
}

export function validateAttachmentFile(file: File): string | null {
  return validateAttachmentMeta(file.name, file.size);
}

function buildAttachmentFilePath(inquiryId: string, fileName: string): string {
  const timestamp = Date.now();
  const safeName = fileName.replace(/[^\w.\-()가-힣]/g, "_");
  return `${inquiryId}/${timestamp}-${safeName}`;
}

export function saveInquiryAttachmentsToSession(
  inquiryId: string,
  attachments: InquiryAttachment[]
): void {
  sessionStorage.setItem(
    INQUIRY_ATTACHMENTS_SESSION_KEY(inquiryId),
    JSON.stringify(attachments)
  );
}

export function readInquiryAttachmentsFromSession(
  inquiryId: string
): InquiryAttachment[] {
  if (typeof window === "undefined") return [];

  const raw = sessionStorage.getItem(INQUIRY_ATTACHMENTS_SESSION_KEY(inquiryId));
  if (!raw) return [];

  try {
    return JSON.parse(raw) as InquiryAttachment[];
  } catch {
    return [];
  }
}

export function removeInquiryAttachmentsFromSession(inquiryId: string): void {
  sessionStorage.removeItem(INQUIRY_ATTACHMENTS_SESSION_KEY(inquiryId));
}

export function saveInquiryPasswordToSession(
  inquiryId: string,
  password: string
): void {
  sessionStorage.setItem(INQUIRY_PASSWORD_SESSION_KEY(inquiryId), password);
}

export function readInquiryPasswordFromSession(inquiryId: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(INQUIRY_PASSWORD_SESSION_KEY(inquiryId));
}

export function removeInquiryPasswordFromSession(inquiryId: string): void {
  sessionStorage.removeItem(INQUIRY_PASSWORD_SESSION_KEY(inquiryId));
}

const INQUIRY_FILE_SELECT =
  "id, inquiry_id, file_name, file_path, file_size, mime_type, created_at";

/** 문의 상세용 첨부파일 메타데이터 조회 */
export async function fetchInquiryFiles(
  inquiryId: string,
  options: { password?: string; asAdmin?: boolean } = {}
): Promise<InquiryFile[]> {
  const supabase = getSupabaseClient();

  if (options.password) {
    const { data, error } = await supabase.rpc("get_inquiry_files", {
      p_id: inquiryId,
      p_password: options.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as InquiryFile[];
  }

  if (options.asAdmin) {
    const { data, error } = await supabase
      .from("inquiry_files")
      .select(INQUIRY_FILE_SELECT)
      .eq("inquiry_id", inquiryId)
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as InquiryFile[];
  }

  throw new Error("첨부파일 조회 권한이 없습니다.");
}

/** Storage download()로 blob 받아 파일 저장 */
export async function downloadInquiryFile(
  file: Pick<InquiryFile, "file_path" | "file_name">
): Promise<void> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.storage
    .from(INQUIRY_FILES_BUCKET)
    .download(file.file_path);

  if (error || !data) {
    console.error("[첨부파일 다운로드 실패]", error);
    alert("파일 다운로드에 실패했습니다.");
    return;
  }

  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.file_name || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function getAdminAccessToken(): Promise<string | null> {
  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

function buildAuthHeaders(
  options: { password?: string; adminToken?: string | null } = {}
): HeadersInit {
  const headers: Record<string, string> = {};

  if (options.adminToken) {
    headers.Authorization = `Bearer ${options.adminToken}`;
  } else if (options.password) {
    headers["X-Inquiry-Password"] = options.password;
  }

  return headers;
}

export async function fetchInquiryAttachmentsApi(
  inquiryId: string,
  options: { password?: string; asAdmin?: boolean } = {}
): Promise<InquiryAttachment[]> {
  const adminToken = options.asAdmin ? await getAdminAccessToken() : null;

  const response = await fetch(`/api/inquiries/${inquiryId}/attachments`, {
    headers: buildAuthHeaders({
      password: options.password,
      adminToken,
    }),
  });

  const result = (await response.json()) as {
    attachments?: InquiryAttachment[];
    error?: string;
  };

  if (!response.ok) {
    throw new Error(result.error ?? "첨부파일을 불러오지 못했습니다.");
  }

  return result.attachments ?? [];
}

/** anon/auth Supabase 클라이언트로 Storage 업로드 + inquiry_files 메타데이터 저장 */
export async function uploadInquiryAttachmentsApi(
  inquiryId: string,
  files: File[]
): Promise<InquiryAttachment[]> {
  const supabase = getSupabaseClient();
  const uploaded: InquiryAttachment[] = [];

  for (const file of files) {
    const validationError = validateAttachmentFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    const filePath = buildAttachmentFilePath(inquiryId, file.name);

    const { error: uploadError } = await supabase.storage
      .from(INQUIRY_FILES_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data, error: insertError } = await supabase
      .from("inquiry_files")
      .insert({
        inquiry_id: inquiryId,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type || null,
      })
      .select("id, inquiry_id, file_name, file_path, file_size, mime_type, created_at")
      .single();

    if (insertError || !data) {
      await supabase.storage.from(INQUIRY_FILES_BUCKET).remove([filePath]);
      throw new Error(insertError?.message ?? "첨부파일 정보 저장에 실패했습니다.");
    }

    const { data: signedData } = await supabase.storage
      .from(INQUIRY_FILES_BUCKET)
      .createSignedUrl(filePath, 3600);

    uploaded.push({
      ...data,
      signed_url: signedData?.signedUrl ?? null,
    });
  }

  return uploaded;
}

export async function deleteInquiryAttachmentApi(
  inquiryId: string,
  attachmentId: string,
  options: { password?: string; asAdmin?: boolean } = {}
): Promise<void> {
  const adminToken = options.asAdmin ? await getAdminAccessToken() : null;

  const response = await fetch(
    `/api/inquiries/${inquiryId}/attachments/${attachmentId}`,
    {
      method: "DELETE",
      headers: buildAuthHeaders({
        password: options.password,
        adminToken,
      }),
    }
  );

  const result = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(result.error ?? "첨부파일 삭제에 실패했습니다.");
  }
}

export function getInquiryAttachmentDownloadUrl(
  inquiryId: string,
  attachmentId: string,
  options: { password?: string } = {}
): string {
  const params = new URLSearchParams();
  if (options.password) {
    params.set("password", options.password);
  }
  const query = params.toString();
  return `/api/inquiries/${inquiryId}/attachments/${attachmentId}/download${query ? `?${query}` : ""}`;
}
