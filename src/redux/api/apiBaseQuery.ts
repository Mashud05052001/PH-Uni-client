/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  // https://3-ph-university-server.vercel.app/
  // baseUrl: "https://3-ph-university-server.vercel.app/api/v1",
  credentials: "include", // if wanted to save token in cookies
  prepareHeaders: (headers, api) => {
    const token = (api.getState() as RootState).auth.token;
    if (token) headers.set("Authorization", token);
    return headers;
  },
});

export const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const { dispatch, getState } = api;
  let result = await baseQuery(args, api, extraOptions);

  // If access token or refresh expired then will be enter it
  if (result?.error?.status === 401) {
    // generating new access token using refresh token
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    // If access token founded successfully that means refresh token is valid & update the access token
    if (data?.data?.accessToken) {
      const token = data?.data?.accessToken;
      const user = (getState() as RootState).auth.user;
      dispatch(setUser({ user, token }));
      result = await baseQuery(args, api, extraOptions);
    }
    // if access token not founded that means there might be some gapla in backend/refresh token so simply logout the user
    else {
      dispatch(logout());
      return;
    }
  }

  return result;
};
