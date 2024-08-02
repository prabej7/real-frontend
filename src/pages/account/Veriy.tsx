import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/Loading";
import url from "@/constant/url";
import { useUserContext } from "@/Provider/UserContext";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify: React.FC = () => {
  const notify = (text: string) => toast.error(text);
  const user = useUserContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies(["token", "otp"]);
  const [userOTP, setOtp] = useState<string>("");

  const sendMail = useCallback(() => {
    (async () => {
      setTimeout(async () => {
        const { data } = await axios.post(`${url}otp`, { token: cookie.token });
        setCookie("otp", data.otp);
      }, 2000);
    })();
  }, []);
  useEffect(() => {
    if (user.email.length > 0) {
      sendMail();
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}verify-otp`, {
        otpToken: cookie.otp,
        userOtp: userOTP,
        token: cookie.token,
      });
      if (response.status === 200) {
        removeCookie("otp");
        window.location.reload();
      }
    } catch (e) {
      const error = e as AxiosError;
      if (error.response.status == 404) {
        notify("Invalid OTP!");
      } else {
        notify("Invalid OTP!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (user.email.length <= 0) return <Loading route="verify" />;

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div>
          <h1 className="text-center font-bold">Email Verification!</h1>
          <p className="text-center">
            We have sent you an email at {user.email} with a OPT.
          </p>
        </div>
        <div className="flex gap-3 mt-6 max-md:w-screen px-6">
          <Input placeholder="OPT" onChange={(e) => setOtp(e.target.value)} />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Verify;
