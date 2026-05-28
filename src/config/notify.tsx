import { Bounce, toast } from "react-toastify";

export const notificationSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    theme: "light",
    transition: Bounce,
  });
};

export const notificationWarn = (message: string) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 2000,
    theme: "light",
    transition: Bounce,
  });
};

export const notificationError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "light",
    transition: Bounce,
  });
};
