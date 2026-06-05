"use client";

import { useEffect, useState } from "react";

type RichTextContentProps = {
  html: string;
  className?: string;
};

export default function RichTextContent({ html, className = "" }: RichTextContentProps) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    let cancelled = false;

    import("@/lib/sanitize-html")
      .then(({ sanitizeHtml }) => {
        if (!cancelled) {
          setSafeHtml(sanitizeHtml(html));
        }
      })
      .catch((error) => {
        console.error("[RichTextContent] sanitize 실패:", error);
        if (!cancelled) {
          setSafeHtml("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [html]);

  return (
    <div
      className={`rich-text-content text-sm leading-relaxed text-gray-800 ${className}`}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
