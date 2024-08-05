import DesktopSection from "@/components/ui/DesktopSection";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import { useUserContext } from "@/Provider/UserContext";
import Verify from "./Veriy";
import useAuth from "@/hooks/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import RoomCard from "@/components/ui/RoomsCard";
import { useRoomContext } from "@/Provider/RoomsContext";
import User from "@/constant/types/user";
import { useCookies } from "react-cookie";
import axios from "axios";
import url from "@/constant/url";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rooms from "./Display/Rooms";
import Hostel from "./Display/Hostel";
import Land from "./Display/Land";
const Account: React.FC = () => {
  const [selected, setSelected] = useState<string>("Rooms");
  const navigate = useNavigate();
  const notify = {
    success: (text: string) => toast.success(text),
    error: (text: string) => toast.error(text),
  };
  const [cookie] = useCookies(["token"]);
  useAuth("account");
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const response = await axios.post(`${url}user`, { token: cookie.token });
      setUser(response.data);
      setLoading(false);
    })();
  }, [user]);

  if (loading) return <Loading route="account" />;

  if (user && !user.verified) return <Verify />;
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  return (
    <div className="section flex overflow-x-clip">
      <MobileNav title="Dashboard">
        <p className="text-center mt-6 font-medium">
          What are you looking for?
        </p>

        <div className="flex gap-3 mt-3">
          <Input placeholder="Search here.." />
          <Button>
            <CiSearch />
          </Button>
        </div>
        <div className="mt-3">
          <select
            className="select select-bordered w-full max-w-xs h-[10px]"
            onChange={handleSelect}
          >
            <option selected>Rooms</option>
            <option>Hostels</option>
            <option>Lands</option>
          </select>
        </div>
        <div className="h-auto overflow-y-auto"></div>
      </MobileNav>
      <DesktopSection account title="Dashboard" isNav route="account">
        <div className="lg:w-[900px]">
          <p className=" mt-6 font-medium">What are you looking for?</p>

          <div className="flex gap-3 mt-3">
            <Input placeholder="Search here.." className="lg:w-80" />
            <Button>
              <CiSearch />
            </Button>
          </div>
          <div className="mt-3">
            <select
              className="select select-bordered w-[500px] max-w-xs h-[10px]"
              onChange={handleSelect}
            >
              <option selected>Rooms</option>
              <option>Hostels</option>
              <option>Lands</option>
            </select>
          </div>
          <div className="pt-12">
            {selected == "Rooms" && <Rooms />}
            {selected == "Hostels" && <Hostel />}
            {selected == "Lands" && <Land />}
          </div>
        </div>
      </DesktopSection>
      <ToastContainer />
    </div>
  );
};

export default Account;
