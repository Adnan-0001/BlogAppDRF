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
  console.log("req..");

  let content;
  if (isLoading) {
    content = "Loading...";
  } else if (isSuccess) {
    content = posts.map((post) => <PostExcerpt key={post.id} post={post} />);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostList;
