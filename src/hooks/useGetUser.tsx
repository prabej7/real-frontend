import url from "@/constant/url";
import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";

const useGetUser = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const get = async (): Promise<any | undefined> => {
    try {
      const response = await axios.post(`${url}user`, { token: cookie.token });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  };

  return { get };
};

export default useGetUser;
