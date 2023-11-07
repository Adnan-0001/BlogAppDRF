import { Link } from "react-router-dom";

const PostExcerpt = ({ post }) => {
  console.log("post is: ", post);
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>

      <p className="post-content">{post.content.substring(0, 100)}</p>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};
export default PostExcerpt;
