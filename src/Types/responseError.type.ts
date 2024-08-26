export type TResponseError = {
    status: number;
    data: {
      success: boolean;
      message: string;
      errorSources?: { path: string; message: string }[];
      stack?: string;
    };
  };