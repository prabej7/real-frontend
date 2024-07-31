import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdMenu } from "react-icons/md";
import { IoMdSettings, IoIosArrowBack } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useUser from "@/hooks/useUser";
import User from "@/constant/types/user";
import Loading from "./Loading";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const DesktopSection: React.FC<Props> = ({ children, title }) => {
  const [isShow, setShow] = useState<boolean>(true);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const userdata = useUser();
  const navigate = useNavigate();
  if (userdata)
    return (
      <>
        <div className="h-screen w-screen flex text-white">
          <div className="bg-black w-[20%] px-12 py-12">
            <div>
              <p className="">
                Hi, {userdata.fullName ? userdata.fullName : "Admin"}
              </p>
              <p className="text-xs">{userdata.email}</p>
            </div>
            <div className="mt-6">
              <Link
                to="/account"
                className="flex items-center gap-2 hover:pl-3 transition-all"
              >
                <MdDashboard className="text-xl" />
                <p>Dashboard</p>
              </Link>
              <Link
                to="/account/rooms"
                className="flex items-center gap-2 hover:pl-3 transition-all"
              >
                <FaBookmark className="text-" />
                <p>Rooms</p>
              </Link>
              <Link
                to="/account/setting"
                className="flex items-center gap-2 hover:pl-3 transition-all"
              >
                <IoMdSettings className="text-" />
                <p>Setting</p>
              </Link>
              <div
                className="flex items-center gap-2 hover:pl-3 transition-all cursor-pointer"
                onClick={() => {
                  removeCookie("token");
                  navigate("/login");
                }}
              >
                <IoLogOut className="text-" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Loading />
    </>
  );
};

export default DesktopSection;
