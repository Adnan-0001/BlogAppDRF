import { apiSlice } from "../../app/api/apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allPosts: builder.query({
      query: () => "posts/",
      providesTags: (result = [], error, arg) => [
        "Post",
        ...result.map(({ id }) => ({ type: "Post", id })),
      ],
    }),
    singlePost: builder.query({
      query: (id) => `posts/${id}/`,
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "posts/",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}/`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),
  }),
});

export const {
  useAllPostsQuery,
  useSinglePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
