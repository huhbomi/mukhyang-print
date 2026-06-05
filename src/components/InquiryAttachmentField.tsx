"use client";

import { useRef, useState } from "react";
import {
  formatFileSize,
  validateAttachmentFile,
} from "@/lib/inquiry-attachments";

type PendingFile = {
  id: string;
  file: File;
};

type InquiryAttachmentFieldProps = {
  files: PendingFile[];
  onChange: (files: PendingFile[]) => void;
  disabled?: boolean;
};

export default function InquiryAttachmentField({
  files,
  onChange,
  disabled = false,
}: InquiryAttachmentFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (incoming: FileList | File[]) => {
    const next = [...files];

    Array.from(incoming).forEach((file) => {
      const error = validateAttachmentFile(file);
      if (error) {
        alert(error);
        return;
      }

      next.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        file,
      });
    });

    onChange(next);
  };

  const removeFile = (id: string) => {
    onChange(files.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (disabled) return;
          addFiles(e.dataTransfer.files);
        }}
        className={`rounded border border-dashed px-4 py-8 text-center transition-colors ${
          isDragging
            ? "border-brand bg-brand/5"
            : "border-gray-300 bg-[#fafafa]"
        }`}
      >
        <p className="text-sm text-gray-700">
          파일을 드래그 앤 드롭하거나 아래 버튼으로 선택해 주세요.
        </p>
        <p className="mt-2 text-xs text-muted">
          이미지, PDF, HWP, DOC, XLS, ZIP / 파일당 최대 10MB
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="mt-4 border border-gray-400 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
        >
          파일 선택
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          disabled={disabled}
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.hwp,.hwpx,.doc,.docx,.xls,.xlsx,.zip"
          onChange={(e) => {
            if (e.target.files) {
              addFiles(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 border border-border bg-white px-3 py-2 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate text-gray-800">{item.file.name}</p>
                <p className="text-xs text-muted">{formatFileSize(item.file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(item.id)}
                disabled={disabled}
                className="shrink-0 text-xs text-red-600 hover:underline disabled:opacity-60"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type { PendingFile };
