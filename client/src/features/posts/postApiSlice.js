import { apiSlice } from "../../app/api/apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allPosts: builder.query({
      query: () => "posts/",
    }),
    singlePost: builder.query({
      query: (id) => `posts/${id}/`,
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "posts/",
        method: "POST",
        body: post,
      }),
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}/`,
        method: "PUT",
        body: post,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/`,
        method: "DELETE",
      }),
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
