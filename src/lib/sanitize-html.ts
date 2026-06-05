import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "del",
  "strike",
  "img",
  "span",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "mark",
];

const ALLOWED_ATTR = ["src", "alt", "title", "style", "class", "data-color"];

const ALLOWED_STYLE_PROPS = [
  "color",
  "background-color",
  "font-size",
  "text-align",
];

let hooksRegistered = false;

function registerSanitizeHooks() {
  if (hooksRegistered) {
    return;
  }

  DOMPurify.addHook("uponSanitizeAttribute", (_node, hookEvent) => {
    if (hookEvent.attrName !== "style" || !hookEvent.attrValue) {
      return;
    }

    const safeStyles = hookEvent.attrValue
      .split(";")
      .map((rule) => rule.trim())
      .filter(Boolean)
      .filter((rule) => {
        const [prop] = rule.split(":").map((part) => part.trim().toLowerCase());
        return ALLOWED_STYLE_PROPS.includes(prop);
      })
      .join("; ");

    if (safeStyles) {
      hookEvent.attrValue = safeStyles;
    } else {
      hookEvent.keepAttr = false;
    }
  });

  hooksRegistered = true;
}

/** XSS 방지를 위한 HTML sanitize */
export function sanitizeHtml(html: string): string {
  registerSanitizeHooks();

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^https?:/i,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input"],
  });
}

/** 에디터 저장용 — 빈 내용 체크 */
export function isEmptyHtml(html: string): boolean {
  const text = sanitizeHtml(html)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  return text.length === 0;
}
