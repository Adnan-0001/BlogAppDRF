import PostExcerpt from "./PostExcerpt";
import { useAllPostsQuery } from "./postApiSlice";

const PostList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllPostsQuery();

  let content;
  if (isLoading) {
    content = "Loading...";
  } else if (isSuccess) {
    content = posts.length ? (
      posts.map((post) => <PostExcerpt key={post.id} post={post} />)
    ) : (
      <h3>No Posts to see</h3>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <section className="posts-list">{content}</section>;
};

export default PostList;
