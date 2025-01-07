import { toast } from "react-toastify";

export const successNotify = (message, autoClose) =>
  toast.success(message, {
    autoClose: autoClose,
  });
export const errorNotify = (message, autoClose) =>
  toast.error(message, {
    autoClose: autoClose,
  });

export const infoNotify = (message, autoClose) =>
  toast.info(message, {
    autoClose: autoClose,
  });
