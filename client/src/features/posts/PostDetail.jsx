import { useNavigate, useParams } from "react-router-dom";
import { useSinglePostQuery, useDeletePostMutation } from "./postApiSlice";
import { Link } from "react-router-dom";
import { selectCurrentUserId } from "../auth/authSlice";
import { useSelector } from "react-redux";

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

      navigate("/posts");
    } catch (error) {
      console.log("Error in deleting post: ", error);
    }
  };

  let content;
  if (isFetching) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>

        <p className="post-content">{post.content}</p>

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
