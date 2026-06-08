import { createClient } from "@supabase/supabase-js";
import {
  getAuthedClientForAccess,
  verifyInquiryAccess,
} from "@/lib/inquiry-access-server";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { INQUIRY_FILES_BUCKET } from "@/types/inquiry-attachments";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string; attachmentId: string }>;
};

export async function DELETE(request: Request, context: RouteContext) {
  const { id: inquiryId, attachmentId } = await context.params;
  const access = await verifyInquiryAccess(inquiryId, request);

  if (!access) {
    return NextResponse.json(
      { error: "첨부파일 삭제 권한이 없습니다." },
      { status: 403 }
    );
  }

  if (access.type === "user") {
    const { url, anonKey } = getSupabaseEnv();
    const supabase = createClient(url, anonKey);

    const { data: filePath, error: rpcError } = await supabase.rpc(
      "delete_inquiry_file_with_password",
      {
        p_inquiry_id: inquiryId,
        p_password: access.password,
        p_file_id: attachmentId,
      }
    );

    if (rpcError) {
      return NextResponse.json({ error: rpcError.message }, { status: 500 });
    }

    if (!filePath) {
      return NextResponse.json(
        { error: "첨부파일을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const { error: storageError } = await supabase.storage
      .from(INQUIRY_FILES_BUCKET)
      .remove([filePath]);

    if (storageError) {
      return NextResponse.json({ error: storageError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  }

  const supabase = getAuthedClientForAccess(access);

  const { data: attachment, error: fetchError } = await supabase
    .from("inquiry_files")
    .select("id, inquiry_id, file_path")
    .eq("id", attachmentId)
    .eq("inquiry_id", inquiryId)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!attachment) {
    return NextResponse.json(
      { error: "첨부파일을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const { error: storageError } = await supabase.storage
    .from(INQUIRY_FILES_BUCKET)
    .remove([attachment.file_path]);

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  const { error: deleteError } = await supabase
    .from("inquiry_files")
    .delete()
    .eq("id", attachmentId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
