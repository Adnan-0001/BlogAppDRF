import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../components/TextEditor";
import { showToast } from "../../utils";
import { selectCurrentUserId } from "../auth/authSlice";
import { useCreatePostMutation } from "./postApiSlice";

export const PostCreateForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleContentInput = (e) => setContent(e.target.value);

  const currUserId = useSelector(selectCurrentUserId);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, "  content is: ", content);

    try {
      const result = await createPost({
        title,
        content,
        author: currUserId,
      }).unwrap();
      showToast({ message: "Post created successfully!", type: "success" });
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log("Error in adding new post: ", error);
      showToast({
        message: "There was an error in creating post!",
        type: "error",
      });
    }
  };

  const postCreateForm = (
    <section className="post-create-form">
      <form className="form form-post" onSubmit={handleSubmit}>
        <h4>Create Post</h4>
        <div className="form-row">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={handleTitleInput}
            required
            maxLength={60}
          />
        </div>
        {/* <div className="form-row">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            // type="text-area"
            rows={10}
            id="content"
            className="form-input"
            value={content}
            onChange={handleContentInput}
            required
          />
        </div> */}

        <TextEditor content={content} setContent={setContent} />

        <div className="submit-btn-container">
          <button type="submit" className="btn btn-block">
            Save
          </button>
        </div>
      </form>
    </section>
  );

  return <>{isLoading ? <h1>Loading...</h1> : postCreateForm}</>;
};
