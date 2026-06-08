export const HEADING_OPTIONS = [
  { label: "본문", value: "paragraph" as const },
  { label: "제목1 (H1)", value: 1 as const },
  { label: "제목2 (H2)", value: 2 as const },
  { label: "제목3 (H3)", value: 3 as const },
  { label: "제목4 (H4)", value: 4 as const },
];

export const FONT_SIZE_OPTIONS = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
] as const;

export const TEXT_COLOR_OPTIONS = [
  { label: "검정", value: "#000000" },
  { label: "회색", value: "#6b7280" },
  { label: "빨강", value: "#dc2626" },
  { label: "주황", value: "#ea580c" },
  { label: "노랑", value: "#ca8a04" },
  { label: "초록", value: "#16a34a" },
  { label: "파랑", value: "#2563eb" },
  { label: "남색", value: "#1e3a8a" },
  { label: "보라", value: "#7c3aed" },
] as const;

export const HIGHLIGHT_COLOR_OPTIONS = [
  { label: "노랑", value: "#fef08a" },
  { label: "연두", value: "#bbf7d0" },
  { label: "하늘", value: "#bae6fd" },
  { label: "분홍", value: "#fbcfe8" },
] as const;
