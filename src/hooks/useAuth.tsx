import url from "@/constant/url";
import axios, { AxiosError } from "axios";

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useAuth = (route: string) => {
  const [cookie, setCookie] = useCookies(["token", "otp"]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (!cookie.token) return navigate("/login");
      try {
        const { status } = await axios.post(`${url}auth`, {
          token: cookie.token,
        });
        if (status == 200) {
          navigate(`/${route}`);
        }
      } catch (e) {
        const error = e as AxiosError;
        if (error.response.status == 404 || error.response.status == 401) {
          navigate("/login");
        }
      }
    })();
  }, []);
};

export default useAuth;
