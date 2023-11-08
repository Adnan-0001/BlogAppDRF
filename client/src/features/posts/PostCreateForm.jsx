import { useState } from "react";
import { useCreatePostMutation } from "./postApiSlice";
import { selectCurrentUserId } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    try {
      const result = await createPost({
        title,
        content,
        author: currUserId,
      }).unwrap();

      navigate("/posts");
    } catch (error) {
      console.log("Error in adding new post: ", error);
    }
  };

  const postCreateForm = (
    <section className="post-create-form">
      <form className="form" onSubmit={handleSubmit}>
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
          />
        </div>

        <div className="form-row">
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
        </div>

        <button type="submit" className="btn btn-block">
          Save
        </button>
      </form>
    </section>
  );

  return <>{isLoading ? <h1>Loading...</h1> : postCreateForm}</>;
};
