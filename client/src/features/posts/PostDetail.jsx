import DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../utils";
import { selectCurrentUserId } from "../auth/authSlice";
import { PostAuthor } from "./PostAuthor";
import { useDeletePostMutation, useSinglePostQuery } from "./postApiSlice";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const currUserId = useSelector(selectCurrentUserId);

  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
  } = useSinglePostQuery(postId);

  const [deletePost] = useDeletePostMutation();

  const handlePostDeletion = async () => {
    try {
      const result = await deletePost(postId).unwrap();
      showToast({
        message: "Post deleted successfully!",
        type: "success",
      });
      navigate("/posts");
    } catch (error) {
      showToast({
        message: "There was an error in deleting post!",
        type: "error",
      });
      console.log("Error in deleting post: ", error);
    }
  };

  let content;
  if (isFetching) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    const postContent = DOMPurify.sanitize(post.content);

    content = (
      <article className="post">
        <h2>{post.title}</h2>

        <div className="post-info">
          <PostAuthor userId={post.author} />
        </div>

        <p
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postContent }}
        ></p>

        {post.author === currUserId && (
          <>
            <li>
              <Link to={`/posts/edit/${post.id}`} className="button">
                Edit Post
              </Link>
            </li>
            <li>
              <button onClick={handlePostDeletion} className="btn">
                Delete Post
              </button>
            </li>
          </>
        )}
      </article>
    );
  } else if (isError) {
    navigate("/posts");
  }

  return <section>{content}</section>;
};
export default PostDetail;
