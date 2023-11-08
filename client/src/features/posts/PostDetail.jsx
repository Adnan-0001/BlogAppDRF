import { useParams } from "react-router-dom";
import { useSinglePostQuery } from "./postApiSlice";
import { Link } from "react-router-dom";
import { selectCurrentUserId } from "../auth/authSlice";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const { postId } = useParams();
  const currUserId = useSelector(selectCurrentUserId);

  const { data: post, isFetching, isSuccess } = useSinglePostQuery(postId);

  let content;
  if (isFetching) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>

        <p className="post-content">{post.content}</p>

        {post.id === currUserId && (
          <Link to={`/posts/edit/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    );
  }

  return <section>{content}</section>;
};
export default PostDetail;
