import url from "@/constant/url";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const auth = async (token: string): Promise<boolean | undefined> => {
    try {
      const response = await axios.post(`${url}auth`, { token: token });
      console.log(response);
      if (response.status == 200) {
        return true;
      }
      return false;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.status == 401) {
        return false;
      }
    }
  };
  return { auth };
};

export default useAuth;
