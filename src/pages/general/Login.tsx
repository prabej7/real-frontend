import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useState } from "react";
const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Please provide a valid email address." }),
  password: z.string().min(8, {
    message: "Password must containt at leat 8 characters",
  }),
});

type formField = z.infer<typeof schema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<formField>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData: formField) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}login`,
        formData
      );
      setCookie("token", data.token);
      reset();
      navigate("/account");
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status == 404) {
        setError("root", { message: "User doesn't exists!" });
      } else {
        setError("root", { message: "Something went wrong!" });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="section flex justify-center items-center gap-72">
        <div>
          <h1 className="font-bold text-3xl mb-6 text-center">Login</h1>
          {errors.root && (
            <p className="text-red-500 text-center mb-3">
              {errors.root.message}
            </p>
          )}
          <form
            className="flex flex-col gap-3 w-[250px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <div className="relative">
              <Input
                placeholder="Password"
                type={show ? "text" : "password"}
                {...register("password")}
              />
              {show ? (
                <FaEye
                  className="absolute top-[10px] right-[15px]"
                  onClick={() => setShow(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-[10px] right-[15px]"
                  onClick={() => setShow(true)}
                />
              )}

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <p className="text-center mt-3">
            Don't have an account ? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
