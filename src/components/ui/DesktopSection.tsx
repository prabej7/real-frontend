import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useState } from "react";
import { useCookies } from "react-cookie";
import useAuth from "@/hooks/useAuth";

interface Props {
  children?: React.ReactNode;
  title?: string;
  account?: boolean;
  rooms?: boolean;
  setting?: boolean;
  isNav?: boolean;
  route?: string;
}

const DesktopSection: React.FC<Props> = ({
  children,
  title,
  account,
  rooms,
  setting,
  isNav,
  route,
}) => {
  const [isShow, setShow] = useState<boolean>(true);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-screen flex text-white">
        <div
          className="bg-black w-[20%]  px-12 py-12"
          style={{ display: isNav ? "block" : "none" }}
        >
          <div>
            <p className="">Hi, {"Admin"}</p>
            <p className="text-xs">{}</p>
          </div>
          <div className="mt-6">
            <Link
              to="/account"
              className={`flex items-center gap-2 ${
                account ? "pl-3" : "hover:pl-3"
              }  transition-all`}
            >
              <MdDashboard className="text-xl" />
              <p>Dashboard</p>
            </Link>
            <Link
              to="/account/messages"
              className={`flex items-center gap-2 ${
                rooms ? "pl-3" : "hover:pl-3"
              }  transition-all`}
            >
              <FaBookmark className="text-" />
              <p>Messages</p>
            </Link>
            <Link
              to="/account/setting"
              className={`flex items-center gap-2 ${
                setting ? "pl-3" : "hover:pl-3"
              }  transition-all`}
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
        <div className="text-black pt-12 pl-12">
          <h1 className="font-bold text-xl">{title}</h1>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default DesktopSection;
