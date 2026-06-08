import {
  EDITOR_IMAGE_ALLOWED_EXTENSIONS,
  EDITOR_IMAGE_MAX_SIZE,
} from "@/types/editor-images";

export function validateEditorImageFile(file: File): string | null {
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

export async function uploadEditorImage(file: File): Promise<string> {
  const validationError = validateEditorImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/editor/upload-image", {
    method: "POST",
    body: formData,
  });

  const result = (await response.json()) as { url?: string; error?: string };

  if (!response.ok || !result.url) {
    throw new Error(result.error ?? "이미지 업로드에 실패했습니다.");
  }

  return result.url;
}
