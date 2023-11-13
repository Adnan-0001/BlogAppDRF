import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DOMAIN } from "../app/api/apiSlice";
import { useUploadImageMutation } from "../features/images/imageApiSlice";

const TextEditor = ({ content, setContent }) => {
  const [uploadImage] = useUploadImageMutation();
  const quillRef = useRef(null);

  function quill_img_handler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn("You can only upload images.");
      }
    };
  }

  async function saveToServer(file) {
    try {
      const resp = await uploadImage(file).unwrap();
      const { image } = resp;

      const url = DOMAIN + image;
      insertToEditor(url);
    } catch (error) {
      console.log("Could not upload image, ", error);
    }
  }

  function insertToEditor(url) {
    const quillEditorInstance = quillRef.current.editor;

    if (quillEditorInstance) {
      const range = quillEditorInstance.getSelection();
      quillEditorInstance.insertEmbed(range.index, "image", url);
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: { image: quill_img_handler },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <div className="editor-container">
      <ReactQuill
        theme="snow"
        placeholder="Insert your content here..."
        value={content}
        onChange={setContent}
        modules={modules}
        ref={quillRef}
      ></ReactQuill>
    </div>
  );
};

export default TextEditor;
