export type InquiryFile = {
  id: string;
  inquiry_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
};

export type InquiryAttachment = InquiryFile & {
  signed_url?: string | null;
};

export const INQUIRY_FILES_BUCKET = "inquiry-files";

export const INQUIRY_ATTACHMENT_MAX_SIZE = 10 * 1024 * 1024;

export const INQUIRY_ATTACHMENT_ALLOWED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "pdf",
  "hwp",
  "hwpx",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "zip",
] as const;
