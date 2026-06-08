"use client";

import { useState } from "react";
import {
  downloadInquiryFile,
  formatFileSize,
} from "@/lib/inquiry-attachments";
import type { InquiryFile } from "@/types/inquiry-attachments";

type InquiryAttachmentListProps = {
  attachments: InquiryFile[];
  onDelete?: (attachmentId: string) => void;
  isDeletingId?: string | null;
  showDelete?: boolean;
  emptyMessage?: string;
};

export default function InquiryAttachmentList({
  attachments,
  onDelete,
  isDeletingId = null,
  showDelete = false,
  emptyMessage = "첨부된 파일이 없습니다.",
}: InquiryAttachmentListProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  if (attachments.length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  const handleDownload = async (attachment: InquiryFile) => {
    setDownloadingId(attachment.id);
    try {
      await downloadInquiryFile({
        file_path: attachment.file_path,
        file_name: attachment.file_name,
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <ul className="space-y-2">
      {attachments.map((attachment) => (
        <li
          key={attachment.id}
          className="flex items-center justify-between gap-3 border border-border bg-white px-3 py-2 text-sm"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-gray-800">
              {attachment.file_name}
            </p>
            <p className="text-xs text-muted">
              {attachment.file_size != null
                ? formatFileSize(attachment.file_size)
                : "—"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => handleDownload(attachment)}
              disabled={downloadingId === attachment.id}
              className="border border-gray-400 px-3 py-1 text-xs text-gray-700 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloadingId === attachment.id ? "준비 중..." : "다운로드"}
            </button>
            {showDelete && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(attachment.id)}
                disabled={isDeletingId === attachment.id}
                className="text-xs text-red-600 hover:underline disabled:opacity-60"
              >
                {isDeletingId === attachment.id ? "삭제 중..." : "삭제"}
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
