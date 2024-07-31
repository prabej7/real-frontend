import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdMenu } from "react-icons/md";
import { IoMdSettings, IoIosArrowBack } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCookies } from "react-cookie";
interface Props {
  children?: React.ReactNode;
  title?: string;
}
const SideBar: React.FC<Props> = ({ children, title }) => {
  const [isShow, setShow] = useState<boolean>(true);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  return (
    <>
      <motion.div
        animate={{ x: isShow ? 0 : -280 }}
        className="h-screen w-[20%] bg-black px-12 py-12 sidebar"
      >
        <div className="flex">
          <div>
            <h3 className="text-white">Hi, Admin</h3>
            <div className="mt-6">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/"
                    className="text-white flex items-center gap-2 hover:px-3 transition-all"
                  >
                    <MdDashboard className="text-2xl" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-white flex items-center gap-2 hover:px-3 transition-all"
                  >
                    <FaBookmark className="text-2xl" />
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-white flex items-center gap-2 hover:px-3 transition-all"
                  >
                    <IoMdSettings className="text-2xl" />
                    Accounts
                  </Link>
                </li>
                <li
                  className="flex gap-2 text-white cursor-pointer hover:px-3 transition-all"
                  onClick={() => {
                    removeCookie("token");
                    navigate("/login");
                  }}
                >
                  <IoLogOut className="text-2xl" />
                  Logout
                </li>
              </ul>
            </div>
          </div>
          <IoIosArrowBack
            className="text-white text-2xl relative top-60 left-14 cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>
        <MdMenu
          className="text-3xl relative top-[-205px] left-[240px] cursor-pointer"
          style={{ display: isShow ? "none" : "block" }}
          onClick={() => setShow(true)}
        />
        <div className="relative top-[-215px] left-[208px] pt-12 pl-12">
          <h1 className="font-bold">{title}</h1>
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default SideBar;

interface Props {
  children?: React.ReactNode;
}

export const MobileNav: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <motion.div className="mobile-sidebar" animate={{ x: show ? 0 : -140 }}>
        <ul className="bg-black h-screen px-6 py-6">
          <MdMenu
            className="relative top-[-10px] left-[120px] text-2xl"
            onClick={() => setShow(!show)}
          />
          <Link to="/account" className="text-white ">
            Dashboard
          </Link>
          <li className="text-white">
            <Link to="/rooms" className="text-white">
              Rooms
            </Link>
          </li>
          <li className="text-white">
            <li className="text-white">
              <Link to="/" className="text-white">
                Accounts
              </Link>
            </li>
          </li>
          <li className="text-white">
            <li className="text-white">
              <Link to="/" className="text-white">
                Logout
              </Link>
            </li>
          </li>
        </ul>
      </motion.div>
      <div className="mt-[14px] ml-12 mobile-s " style={{ display: "none" }}>
        {children}
      </div>
    </>
  );
};
