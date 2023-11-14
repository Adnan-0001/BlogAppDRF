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
    checkTokenValidity: builder.mutation({
      query: () => ({
        url: "check-token-validity/",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (formData) => ({
        url: "register/",
        method: "POST",
        body: { ...formData },
      }),
    }),
    refreshToken: builder.mutation({
      // not used
      query: (refresh) => ({
        url: "token/refresh/",
        method: "GET",
        body: { refresh },
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ userId, token }) => ({
        url: `confirm-email/${userId}/${token}/`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  // useCheckTokenValidityQuery,
  useCheckTokenValidityMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
} = authApiSlice;
