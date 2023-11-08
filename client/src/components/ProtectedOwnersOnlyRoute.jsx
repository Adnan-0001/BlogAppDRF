import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../features/auth/authSlice";
import { useSinglePostQuery } from "../features/posts/postApiSlice";

const ProtectedOwnersOnlyRoute = ({ children }) => {
  const userId = useSelector(selectCurrentUserId);
  const { postId } = useParams();
  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
  } = useSinglePostQuery(postId);

  if (isFetching) {
    return <h1>Loading ...</h1>;
  }

  if ((isSuccess && userId !== post.author) || isError) {
    return <Navigate to="/posts" replace={true} />;
  }
  return children;
};
export default ProtectedOwnersOnlyRoute;
