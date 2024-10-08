import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alert = () => {
  const notify = {
    success: (text: string) => toast.success(text),
    error: (text: string) => toast.error(text),
    info: (text: string) => toast.info(text),
  };
  return { notify, ToastContainer };
};

export default Alert;
