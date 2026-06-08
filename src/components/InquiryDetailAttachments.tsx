"use client";

import { useEffect, useState } from "react";
import InquiryAttachmentList from "@/components/InquiryAttachmentList";
import { useAdmin } from "@/contexts/AdminContext";
import { readInquiryPasswordFromSession } from "@/lib/inquiry-attachments";
import { getSupabaseClient } from "@/lib/supabase";
import type { InquiryFile } from "@/types/inquiry-attachments";

const INQUIRY_FILE_SELECT =
  "id, inquiry_id, file_name, file_path, file_size, mime_type, created_at";

type InquiryDetailAttachmentsProps = {
  inquiryId: string;
};

export default function InquiryDetailAttachments({
  inquiryId,
}: InquiryDetailAttachmentsProps) {
  const { isAdmin } = useAdmin();
  const [attachments, setAttachments] = useState<InquiryFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!inquiryId.trim()) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function loadAttachments() {
      setIsLoading(true);
      setLoadError(false);

      try {
        const supabase = getSupabaseClient();
        let files: InquiryFile[] = [];

        if (isAdmin) {
          const { data, error } = await supabase
            .from("inquiry_files")
            .select(INQUIRY_FILE_SELECT)
            .eq("inquiry_id", inquiryId)
            .order("created_at", { ascending: true });

          if (error) {
            throw error;
          }

          files = (data ?? []) as InquiryFile[];
        } else {
          const password = readInquiryPasswordFromSession(inquiryId);

          if (password) {
            const { data, error } = await supabase.rpc("get_inquiry_files", {
              p_id: inquiryId,
              p_password: password,
            });

            if (error) {
              throw error;
            }

            files = (data ?? []) as InquiryFile[];
          }
        }

        if (!cancelled) {
          setAttachments(files);
        }
      } catch (error) {
        console.error("[InquiryDetailAttachments] 첨부파일 조회 실패:", error);
        if (!cancelled) {
          setLoadError(true);
          setAttachments([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadAttachments();

    return () => {
      cancelled = true;
    };
  }, [inquiryId, isAdmin]);

  return (
    <div className="mt-10 border border-border">
      <div className="border-b border-border bg-[#f9f9f9] px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">첨부파일</h2>
      </div>
      <div className="px-4 py-4">
        {isLoading ? (
          <p className="text-sm text-muted">첨부파일을 불러오는 중입니다...</p>
        ) : loadError ? (
          <p className="text-sm text-red-600">첨부파일을 불러오지 못했습니다.</p>
        ) : (
          <InquiryAttachmentList attachments={attachments} />
        )}
      </div>
    </div>
  );
}
