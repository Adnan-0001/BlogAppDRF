import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: (refresh) => ({
        url: "logout/",
        method: "POST",
        body: { refresh },
      }),
    }),
    refreshToken: builder.mutation({
      query: (refresh) => ({
        url: "token/refresh/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } =
  authApiSlice;
