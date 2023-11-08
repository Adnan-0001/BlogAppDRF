import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div className="post-info">
        <PostAuthor userId={post.author} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};
export default PostExcerpt;
