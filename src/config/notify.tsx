import { Bounce, toast, type ToastContent } from "react-toastify";

export const notificationSuccess = (message: ToastContent) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    theme: "light",
    transition: Bounce,
  });
};

export const notificationWarn = (message: ToastContent) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 2000,
    theme: "light",
    transition: Bounce,
  });
};

export const notificationError = (message: ToastContent) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "light",
    transition: Bounce,
  });
};
