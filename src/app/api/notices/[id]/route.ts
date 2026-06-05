import {
  createAuthedSupabaseClient,
  verifyAdminFromRequest,
} from "@/lib/admin-auth-server";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const admin = await verifyAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "관리자 권한이 필요합니다." },
      { status: 403 }
    );
  }

  const { id } = await context.params;
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

  const { data, error } = await supabase
    .from("notices")
    .update({
      title,
      content,
      is_pinned,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id, title, content, created_at, is_pinned, updated_at")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json(
      { error: "공지사항을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json({ notice: data });
}

export async function DELETE(request: Request, context: RouteContext) {
  const admin = await verifyAdminFromRequest(request);

  if (!admin) {
    return NextResponse.json(
      { error: "관리자 권한이 필요합니다." },
      { status: 403 }
    );
  }

  const { id } = await context.params;
  const supabase = createAuthedSupabaseClient(admin.accessToken);

  const { error } = await supabase.from("notices").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
