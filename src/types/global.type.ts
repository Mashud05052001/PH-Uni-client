/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryApi } from "@reduxjs/toolkit/query";

type TErrorSource = { path: string; message: string };

// It is used for select field options
export type TSelect = { value: unknown; label: unknown }[];

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack?: string;
    errorSources: TErrorSource[];
  };
};
export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TSuccess = {
  success: boolean;
  message: string;
  data: any;
};

export type TResponseMetaData<T> = {
  success: boolean;
  message: string;
  data: {
    data: T;
    meta: TMeta;
  };
};

export type TReduxReponse<T> = TResponseMetaData<T> & BaseQueryApi;

export type TResponse = {
  error?: TError;
  data?: TSuccess;
};
