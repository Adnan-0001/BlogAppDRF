import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setCredentials,
  clearCredentials,
} from "../../features/auth/authSlice";
import { getRefreshToken } from "../../utils";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",

  // injecting auth headers to all outgoing requests
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("q1", result);

  if (result?.error?.status === 401) {
    // console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        url: "/token/refresh/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: getRefreshToken() }),
      },
      api,
      extraOptions
    );
    // console.log("ref res:", refreshResult);

    if (refreshResult?.data) {
      // store the new token
      await api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry the original query with new access token
      if (args?.url === "logout/") {
        const { refresh } = refreshResult.data;
        const newBody = { ...args.body, refresh };
        args = { ...args, body: newBody };
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    checkHello: builder.query({
      query: () => "/hello",
    }),
  }),
});

export const { useCheckHelloQuery } = apiSlice;
