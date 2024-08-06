// TiptapEditor.js
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌍</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="p-2">
      <div className="flex gap-2 mb-4 border-b border-gray-300 pb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("bold") ? "bg-gray-200" : "bg-white"
          } hover:bg-gray-100`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive("italic") ? "bg-gray-200" : "bg-white"
          } hover:bg-gray-100`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : "bg-white"
          } hover:bg-gray-100`}
        >
          Align Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200"
              : "bg-white"
          } hover:bg-gray-100`}
        >
          Align Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-3 py-1 border rounded-md ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : "bg-white"
          } hover:bg-gray-100`}
        >
          Align Right
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100"
        >
          Add Link
        </button>
        <select
          onChange={(event) =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: +event.target.value })
              .run()
          }
          defaultValue=""
          className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100"
        >
          <option value="">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>
      </div>
      <EditorContent
        editor={editor}
        className="border border-gray-300  p-4 min-h-[200px] "
      />
    </div>
  );
};

export default TiptapEditor;
