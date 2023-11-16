import { useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DOMAIN } from "../app/api/apiSlice";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "../features/images/imageApiSlice";

const TextEditor = ({ content, setContent }) => {
  const [uploadImage] = useUploadImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const quillRef = useRef(null);

  useEffect(() => {
    console.log("in useEffect");
    if (quillRef) {
      console.log("in useEffect also editor exists");

      const quillEditorInstance = quillRef.current.editor;

      quillEditorInstance.on("text-change", (delta, oldContents, source) => {
        if (source !== "user") return;

        const deletedImagesUrls = getImgUrls(
          quillEditorInstance.getContents().diff(oldContents)
        );

        if (deletedImagesUrls.length) {
          console.log("delete", deletedImagesUrls);
          deletedImagesUrls.map(async (url) => {
            try {
              const img = url.split("/").pop();
              console.log("toto", img);
              const resp = await deleteImage(img).unwrap();
              console.log("got: ", resp);
            } catch (error) {
              console.log("Error in deleting image:", error);
            }
          });
        }
      });

      function getImgUrls(delta) {
        return delta.ops
          .filter((i) => i.insert && i.insert.image)
          .map((i) => i.insert.image);
      }

      // remove the event listener when the component unmounts
      return () => {
        quillEditorInstance.on(
          "text-change",
          (delta, oldContents, source) => {}
        );
      };
    }
  }, [quillRef]);

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
