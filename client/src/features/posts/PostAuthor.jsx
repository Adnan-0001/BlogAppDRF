import { useSingleUserQuery } from "../users/userApiSlice";

export const PostAuthor = ({ userId }) => {
  const { data: author, isFetching, isSuccess } = useSingleUserQuery(userId);

  let content;
  if (isFetching) {
    content = <h1>Loading ...</h1>;
  } else if (isSuccess) {
    content = <span>by {author ? author.first_name : "Unknown author"}</span>;
  }

  return content;
};
