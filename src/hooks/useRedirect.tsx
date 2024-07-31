import { useCookies } from "react-cookie";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { auth } = useAuth();
  useEffect(() => {
    (async () => {
      if (cookie.token) {
        const isAuth = await auth(cookie.token);
        if (isAuth) {
          return navigate("/account");
        }
        return navigate("/login");
      }
    })();
  }, []);
};

export default useRedirect;
