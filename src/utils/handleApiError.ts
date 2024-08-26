import { toast } from "sonner";
import { TResponseError } from "../Types/responseError.type";


export const handleApiError = (error: unknown, toastId?: number | string) => {
  const apiError = error as TResponseError;

  if (apiError?.data?.message) {
    toast.error(apiError.data.message, { id: toastId, duration: 3000 });
  } else {
    toast.error("An unknown error occurred.", { id: toastId, duration: 3000 });
  }
};
