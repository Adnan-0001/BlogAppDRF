import { useEffect, useState } from "react";
import { useUpdatePostMutation } from "./postApiSlice";
import { selectCurrentUserId } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSinglePostQuery } from "./postApiSlice";
import { Link } from "react-router-dom";

export const PostEditForm = () => {
  const { postId } = useParams();
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
  } = useSinglePostQuery(postId);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const currUserId = useSelector(selectCurrentUserId);
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const handleTitleInput = (e) => setTitle(e.target.value);
  const handleContentInput = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updatePost({
        id: postId,
        title,
        content,
        author: currUserId,
      }).unwrap();

      navigate("/posts");
    } catch (error) {
      console.log("Error in updating post: ", error);
    }
  };

  let pageContent;
  if (isLoading || isFetching) {
    pageContent = <h1>Loading ...</h1>;
  } else if (isSuccess) {
    pageContent = (
      <section className="post-update-form">
        <form className="form" onSubmit={handleSubmit}>
          <h4>Update Post</h4>

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
  } else if (isError) {
    navigate("/posts");
  }

  return <>{pageContent}</>;
};
