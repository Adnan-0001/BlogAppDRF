import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logOut } from "../../features/auth/authSlice";
import { setCredentials } from "../../features/auth/authSlice";
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
  console.log("q1", result);

  if (result?.error?.status === 401) {
    console.log("8**************");
    console.log("sending refresh token");

    const st = getRefreshToken();
    const obj = JSON.stringify({ refresh: st });
    console.log("obj:", obj, st);

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        url: "/token/refresh",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: obj, // Stringify the body as JSON
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // store the new token
      await api.dispatch(setCredentials({ ...refreshResult.data.access }));
      // api.getState().auth.accessToken = refreshResult.data.access;
      console.log("g", api.getState().auth.accessToken);

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);

      await api.dispatch(setCredentials({ ...refreshResult.data }));
    } else {
      // api.dispatch(logOut());
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
