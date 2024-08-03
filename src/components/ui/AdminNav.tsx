import { useCookies } from "react-cookie";
import { FaBookmark } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { FaUser } from "react-icons/fa";
interface Props {
  dashboard?: boolean;
  add?: boolean;
  tenant?: boolean;
  setting?: boolean;
}

const AdminNav: React.FC<Props> = ({ dashboard, add, tenant, setting }) => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  return (
    <>
      <div className="bg-black w-80 h-screen text-white px-12 py-12">
        <div>
          <p className="mb-6 font-medium">Hi, Admin</p>
          <Link
            to="/admin"
            className={`flex items-center gap-2 ${
              dashboard ? "pl-3" : "hover:pl-3"
            }  transition-all`}
          >
            <MdDashboard className="text-xl" />
            <p>Dashboard</p>
          </Link>
          <Link
            to="/admin/add"
            className={`flex items-center gap-2 ${
              add ? "pl-3" : "hover:pl-3"
            }  transition-all`}
          >
            <IoIosAddCircle className="text-" />
            <p>Add Properties</p>
          </Link>
          <Link
            to="/admin/tenant"
            className={`flex items-center gap-2 ${
              tenant ? "pl-3" : "hover:pl-3"
            }  transition-all`}
          >
            <FaUser className="text-" />
            <p>Tenants</p>
          </Link>
          <Link
            to="/admin/setting"
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
    </>
  );
};

export default AdminNav;
