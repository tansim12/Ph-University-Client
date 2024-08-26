import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TResponseError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources?: { path: string; message: string }[];
    stack?: string;
  };
};

export type TResponse<T> = {
  data?: T;
  error?: TResponseError;
  success?: boolean;
  message?: string;
};

export type TReduxResponse<T> = TResponse<T> & BaseQueryApi;
