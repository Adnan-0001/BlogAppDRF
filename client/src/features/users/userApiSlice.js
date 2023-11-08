import { apiSlice } from "../../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => "users/",
    }),
    singleUser: builder.query({
      query: (id) => `users/${id}/`,
    }),
  }),
});

export const { useAllUsersQuery, useSingleUserQuery } = userApiSlice;
