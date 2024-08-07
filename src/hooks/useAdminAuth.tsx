import url from "@/constant/url";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useAdminAuth = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);
  if (!cookie && !cookie.token) return navigate("/admin-login");
  const verifyAdmin = async () => {
    try {
      const { status } = await axios.post(`${url}auth-admin`, {
        token: cookie.token,
      });
      if (status !== 200) {
        navigate("/admin-login");
      }
    } catch (e) {
      return navigate("/admin-login");
    }
  };
  useEffect(() => {
    verifyAdmin();
  }, [cookie.token]);
};

export default useAdminAuth;
