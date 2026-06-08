import {
  getAuthedClientForAccess,
  verifyInquiryAccess,
  verifyInquiryPasswordServer,
} from "@/lib/inquiry-access-server";
import { INQUIRY_FILES_BUCKET } from "@/types/inquiry-attachments";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string; attachmentId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id: inquiryId, attachmentId } = await context.params;
  let access = await verifyInquiryAccess(inquiryId, request);

  if (!access) {
    const url = new URL(request.url);
    const password = url.searchParams.get("password")?.trim();
    if (password && (await verifyInquiryPasswordServer(inquiryId, password))) {
      access = { type: "user", password };
    }
  }

  if (!access) {
    return NextResponse.json(
      { error: "첨부파일 다운로드 권한이 없습니다." },
      { status: 403 }
    );
  }

  const supabase = getAuthedClientForAccess(access);

  const { data: attachment, error: fetchError } = await supabase
    .from("inquiry_files")
    .select("file_path, file_name")
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

  const { data: signedData, error: signedError } = await supabase.storage
    .from(INQUIRY_FILES_BUCKET)
    .createSignedUrl(attachment.file_path, 60);

  if (signedError || !signedData?.signedUrl) {
    return NextResponse.json(
      { error: signedError?.message ?? "다운로드 URL 생성에 실패했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(signedData.signedUrl);
}
