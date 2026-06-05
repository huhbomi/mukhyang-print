"use client";

import type { Editor } from "@tiptap/react";
import { useRef, useState } from "react";
import { uploadEditorImage } from "@/lib/editor-images";
import {
  FONT_SIZE_OPTIONS,
  HEADING_OPTIONS,
  HIGHLIGHT_COLOR_OPTIONS,
  TEXT_COLOR_OPTIONS,
} from "@/lib/tiptap/editor-config";

type EditorToolbarProps = {
  editor: Editor;
  disabled?: boolean;
};

const toolbarButtonClass =
  "px-2.5 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50";

const toolbarSelectClass =
  "h-7 max-w-[120px] border border-gray-300 bg-white px-1.5 text-xs text-gray-700 outline-none focus:border-brand disabled:cursor-not-allowed disabled:opacity-50";

function getActiveHeading(editor: Editor): string {
  for (const level of [1, 2, 3, 4] as const) {
    if (editor.isActive("heading", { level })) {
      return String(level);
    }
  }

  return "paragraph";
}

function getActiveFontSize(editor: Editor): string {
  const attrs = editor.getAttributes("textStyle");
  return attrs.fontSize || "";
}

type PaletteProps = {
  colors: ReadonlyArray<{ label: string; value: string }>;
  onSelect: (color: string | null) => void;
  onClose: () => void;
  resetLabel?: string;
};

function ColorPalette({ colors, onSelect, onClose, resetLabel = "기본" }: PaletteProps) {
  return (
    <div className="absolute left-0 top-full z-20 mt-1 w-44 rounded border border-gray-300 bg-white p-2 shadow-md">
      <div className="grid grid-cols-3 gap-1.5">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            title={color.label}
            onClick={() => {
              onSelect(color.value);
              onClose();
            }}
            className="h-7 w-full rounded border border-gray-200"
            style={{ backgroundColor: color.value }}
            aria-label={color.label}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          onSelect(null);
          onClose();
        }}
        className="mt-2 w-full border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
      >
        {resetLabel}
      </button>
    </div>
  );
}

export default function EditorToolbar({ editor, disabled = false }: EditorToolbarProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isTextColorOpen, setIsTextColorOpen] = useState(false);
  const [isHighlightOpen, setIsHighlightOpen] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleHeadingChange = (value: string) => {
    if (disabled) return;

    const chain = editor.chain().focus();

    if (value === "paragraph") {
      chain.setParagraph().run();
      return;
    }

    chain
      .setHeading({ level: Number(value) as 1 | 2 | 3 | 4 })
      .run();
  };

  const handleFontSizeChange = (value: string) => {
    if (disabled) return;

    if (!value) {
      editor.chain().focus().unsetFontSize().run();
      return;
    }

    editor.chain().focus().setFontSize(value).run();
  };

  const handleImageSelect = async (fileList: FileList | null) => {
    if (!fileList?.length || disabled || isUploadingImage) return;

    const file = fileList[0];
    setIsUploadingImage(true);

    try {
      const url = await uploadEditorImage(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "이미지 업로드에 실패했습니다.";
      alert(message);
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-300 bg-[#f0f0f0] px-2 py-1.5">
      <select
        value={getActiveHeading(editor)}
        onChange={(e) => handleHeadingChange(e.target.value)}
        disabled={disabled}
        className={toolbarSelectClass}
        aria-label="제목 스타일"
      >
        {HEADING_OPTIONS.map((option) => (
          <option
            key={option.label}
            value={
              option.value === "paragraph" ? "paragraph" : String(option.value)
            }
          >
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={getActiveFontSize(editor)}
        onChange={(e) => handleFontSizeChange(e.target.value)}
        disabled={disabled}
        className={toolbarSelectClass}
        aria-label="글자 크기"
      >
        <option value="">크기</option>
        {FONT_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <span className="mx-0.5 h-5 w-px bg-gray-300" aria-hidden />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={disabled}
        className={`${toolbarButtonClass} ${editor.isActive("bold") ? "bg-gray-200 font-semibold text-gray-900" : ""}`}
        aria-label="굵게"
      >
        굵게
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={disabled}
        className={`${toolbarButtonClass} ${editor.isActive("italic") ? "bg-gray-200 font-semibold text-gray-900" : ""}`}
        aria-label="기울임"
      >
        기울임
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={disabled}
        className={`${toolbarButtonClass} ${editor.isActive("underline") ? "bg-gray-200 font-semibold text-gray-900" : ""}`}
        aria-label="밑줄"
      >
        밑줄
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={disabled}
        className={`${toolbarButtonClass} ${editor.isActive("strike") ? "bg-gray-200 font-semibold text-gray-900" : ""}`}
        aria-label="취소선"
      >
        취소선
      </button>

      <span className="mx-0.5 h-5 w-px bg-gray-300" aria-hidden />

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsHighlightOpen(false);
            setIsTextColorOpen((prev) => !prev);
          }}
          disabled={disabled}
          className={toolbarButtonClass}
          aria-label="글자색"
          aria-expanded={isTextColorOpen}
        >
          글자색
        </button>
        {isTextColorOpen && (
          <ColorPalette
            colors={TEXT_COLOR_OPTIONS}
            onSelect={(color) => {
              if (color) {
                editor.chain().focus().setColor(color).run();
              } else {
                editor.chain().focus().unsetColor().run();
              }
            }}
            onClose={() => setIsTextColorOpen(false)}
          />
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsTextColorOpen(false);
            setIsHighlightOpen((prev) => !prev);
          }}
          disabled={disabled}
          className={toolbarButtonClass}
          aria-label="배경색"
          aria-expanded={isHighlightOpen}
        >
          형광펜
        </button>
        {isHighlightOpen && (
          <ColorPalette
            colors={HIGHLIGHT_COLOR_OPTIONS}
            resetLabel="형광펜 제거"
            onSelect={(color) => {
              if (color) {
                editor.chain().focus().setHighlight({ color }).run();
              } else {
                editor.chain().focus().unsetHighlight().run();
              }
            }}
            onClose={() => setIsHighlightOpen(false)}
          />
        )}
      </div>

      <span className="mx-0.5 h-5 w-px bg-gray-300" aria-hidden />

      <button
        type="button"
        onClick={() => imageInputRef.current?.click()}
        disabled={disabled || isUploadingImage}
        className={toolbarButtonClass}
        aria-label="이미지 삽입"
      >
        {isUploadingImage ? "업로드 중..." : "이미지"}
      </button>
      <input
        ref={imageInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.gif,.webp,image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        disabled={disabled || isUploadingImage}
        onChange={(e) => handleImageSelect(e.target.files)}
      />
    </div>
  );
}
