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
    checkTokenValidity: builder.query({
      query: () => "check-token-validity/",
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
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useCheckTokenValidityQuery,
  useRegisterMutation,
} = authApiSlice;
