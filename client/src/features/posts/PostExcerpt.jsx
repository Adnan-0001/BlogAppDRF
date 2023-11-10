import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import DOMPurify from "dompurify";

const PostExcerpt = ({ post }) => {
  const postContent = DOMPurify.sanitize(post.content.substring(0, 100));

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div className="post-info">
        <PostAuthor userId={post.author} />
      </div>
      <p
        className="post-content"
        dangerouslySetInnerHTML={{ __html: postContent }}
      >
        {/* {post.content.substring(0, 100)} */}
      </p>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};
export default PostExcerpt;
