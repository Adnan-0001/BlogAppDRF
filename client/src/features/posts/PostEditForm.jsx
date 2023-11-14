import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../../components/TextEditor";
import { showToast } from "../../utils";
import { selectCurrentUserId } from "../auth/authSlice";
import { useSinglePostQuery, useUpdatePostMutation } from "./postApiSlice";

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

      showToast({
        message: "Post updated successfully!",
        type: "success",
      });
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log("Error in updating post: ", error);
      showToast({
        message: "There was an error in updating post!",
        type: "error",
      });
    }
  };

  let pageContent;
  if (isLoading || isFetching) {
    pageContent = <h1>Loading ...</h1>;
  } else if (isSuccess) {
    pageContent = (
      <section className="post-update-form">
        <form className="form form-post" onSubmit={handleSubmit}>
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
  } else if (isError) {
    navigate("/posts");
  }

  return <>{pageContent}</>;
};
