import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getRefreshToken = () => {
  try {
    const tokens = localStorage.getItem("authTokens");
    const { refresh } = JSON.parse(tokens);
    return refresh;
  } catch (error) {
    console.log(error);
  }
};

export const showToast = (options) => {
  const toastOptions = {
    position: options?.position ? options.position : "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  if (!options.message) return;
  console.log(toastOptions);

  switch (options.type) {
    case "info":
      toast.info(options.message, toastOptions);
      break;
    case "success":
      toast.success(options.message, toastOptions);
      break;
    case "error":
      toast.error(options.message, toastOptions);
      break;
    case "warning":
      toast.warning(options.message, toastOptions);
      break;
    default:
      toast.error("Something went wrong", toastOptions);
  }
};
