import { createClient } from "@supabase/supabase-js";
import {
  getAuthedClientForAccess,
  verifyInquiryAccess,
} from "@/lib/inquiry-access-server";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { INQUIRY_FILES_BUCKET } from "@/types/inquiry-attachments";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type InquiryFileRow = {
  id: string;
  inquiry_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const access = await verifyInquiryAccess(id, request);

  if (!access) {
    return NextResponse.json(
      { error: "첨부파일 조회 권한이 없습니다." },
      { status: 403 }
    );
  }

  let files: InquiryFileRow[] = [];
  let supabaseForSignedUrl;

  if (access.type === "user") {
    const { url, anonKey } = getSupabaseEnv();
    const supabase = createClient(url, anonKey);

    const { data, error } = await supabase.rpc("get_inquiry_files", {
      p_id: id,
      p_password: access.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    files = (data ?? []) as InquiryFileRow[];
    supabaseForSignedUrl = supabase;
  } else {
    const supabase = getAuthedClientForAccess(access);

    const { data, error } = await supabase
      .from("inquiry_files")
      .select("id, inquiry_id, file_name, file_path, file_size, mime_type, created_at")
      .eq("inquiry_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    files = (data ?? []) as InquiryFileRow[];
    supabaseForSignedUrl = supabase;
  }

  const attachments = await Promise.all(
    files.map(async (item) => {
      const { data: signedData } = await supabaseForSignedUrl.storage
        .from(INQUIRY_FILES_BUCKET)
        .createSignedUrl(item.file_path, 3600);

      return {
        ...item,
        signed_url: signedData?.signedUrl ?? null,
      };
    })
  );

  return NextResponse.json({ attachments });
}
