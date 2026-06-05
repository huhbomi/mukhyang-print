import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { FontSize } from "@/lib/tiptap/font-size-extension";

export function createEditorExtensions(placeholder: string) {
  return [
    StarterKit.configure({
      blockquote: false,
      bulletList: false,
      orderedList: false,
      listItem: false,
      codeBlock: false,
      code: false,
      horizontalRule: false,
      heading: {
        levels: [1, 2, 3, 4],
      },
    }),
    Underline,
    TextStyle,
    FontSize,
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    Image.configure({
      inline: false,
      allowBase64: false,
    }),
    Placeholder.configure({
      placeholder,
      emptyEditorClass: "is-editor-empty",
    }),
  ];
}
