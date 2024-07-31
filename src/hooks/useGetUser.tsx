import url from "@/constant/url";
import axios from "axios";
import { useCookies } from "react-cookie";

const useGetUser = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const get = async (): Promise<any | undefined> => {
    try {
      const response = await axios.post(`${url}user`, { token: cookie.token });
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return { get };
};

export default useGetUser;
