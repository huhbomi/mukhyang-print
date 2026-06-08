"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import EditorToolbar from "@/components/rich-text/EditorToolbar";
import { createEditorExtensions } from "@/lib/tiptap/editor-extensions";
import { sanitizeHtml } from "@/lib/sanitize-html";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "내용을 입력해 주세요",
  disabled = false,
  minHeight = 280,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: createEditorExtensions(placeholder),
    content: sanitizeHtml(value || ""),
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(sanitizeHtml(currentEditor.getHTML()));
    },
    editorProps: {
      attributes: {
        class: "rich-text-editor prose-editor outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const sanitized = sanitizeHtml(value || "");
    if (sanitized !== editor.getHTML()) {
      editor.commands.setContent(sanitized, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  if (!editor) {
    return (
      <div
        className="overflow-hidden border border-gray-300 bg-white"
        style={{ minHeight }}
      >
        <div className="border-b border-gray-300 bg-[#f0f0f0] px-2 py-1.5 text-xs text-muted">
          에디터를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-300">
      <EditorToolbar editor={editor} disabled={disabled} />
      <EditorContent
        editor={editor}
        className="rich-text-editor bg-white px-3 py-3 text-sm text-gray-800"
        style={{ minHeight }}
      />
    </div>
  );
}
