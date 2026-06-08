import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";
import {
  EDITOR_IMAGE_ALLOWED_EXTENSIONS,
  EDITOR_IMAGE_BUCKET,
  EDITOR_IMAGE_MAX_SIZE,
} from "@/types/editor-images";
import { NextResponse } from "next/server";

function validateImageFile(file: File): string | null {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (
    !EDITOR_IMAGE_ALLOWED_EXTENSIONS.includes(
      extension as (typeof EDITOR_IMAGE_ALLOWED_EXTENSIONS)[number]
    )
  ) {
    return `허용되지 않는 이미지 형식입니다: ${file.name}`;
  }

  if (file.size > EDITOR_IMAGE_MAX_SIZE) {
    return `이미지 용량은 5MB 이하여야 합니다: ${file.name}`;
  }

  return null;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "업로드할 이미지가 없습니다." },
      { status: 400 }
    );
  }

  const validationError = validateImageFile(file);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { url, anonKey } = getSupabaseEnv();
  const supabase = createClient(url, anonKey);

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^\w.\-()가-힣]/g, "_");
  const filePath = `editor/${timestamp}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(EDITOR_IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(EDITOR_IMAGE_BUCKET).getPublicUrl(filePath);

  return NextResponse.json({ url: data.publicUrl });
}
