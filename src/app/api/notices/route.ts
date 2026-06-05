import {
  createAuthedSupabaseClient,
  verifyAdminFromRequest,
} from "@/lib/admin-auth-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const admin = await verifyAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "관리자 권한이 필요합니다." },
      { status: 403 }
    );
  }

  const body = (await request.json()) as {
    title?: string;
    content?: string;
    is_pinned?: boolean;
  };

  const title = body.title?.trim() ?? "";
  const content = body.content?.trim() ?? "";
  const is_pinned = Boolean(body.is_pinned);

  if (!title || !content) {
    return NextResponse.json(
      { error: "제목과 내용을 입력해 주세요." },
      { status: 400 }
    );
  }

  const supabase = createAuthedSupabaseClient(admin.accessToken);
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("notices")
    .insert({
      title,
      content,
      is_pinned,
      created_at: now,
      updated_at: now,
    })
    .select("id, title, content, created_at, is_pinned, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ notice: data });
}
