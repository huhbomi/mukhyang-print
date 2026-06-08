import createDOMPurify from "dompurify";

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

type PurifyInstance = ReturnType<typeof createDOMPurify>;

let purify: PurifyInstance | null = null;
let hooksRegistered = false;

function getPurify(): PurifyInstance | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!purify) {
    purify = createDOMPurify(window);
  }

  return purify;
}

function stripDangerousHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function registerSanitizeHooks(DOMPurify: PurifyInstance) {
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
  const DOMPurify = getPurify();

  if (!DOMPurify) {
    return stripDangerousHtml(html);
  }

  registerSanitizeHooks(DOMPurify);

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
