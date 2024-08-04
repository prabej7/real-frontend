import DesktopSection from "@/components/ui/DesktopSection";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import { useUserContext } from "@/Provider/UserContext";
import Verify from "./Veriy";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
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
const Account: React.FC = () => {
  const navigate = useNavigate();
  const notify = {
    success: (text: string) => toast.success(text),
    error: (text: string) => toast.error(text),
  };
  const [cookie] = useCookies(["token"]);
  useAuth("account");
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [roomLoading, setRoomLoading] = useState<boolean>(true);
  const rooms = useRoomContext();
  useEffect(() => {
    (async () => {
      const response = await axios.post(`${url}user`, { token: cookie.token });
      setUser(response.data);
      setLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    if (Array.isArray(rooms)) {
      setRoomLoading(false);
    }
  }, [rooms]);
  if (loading) return <Loading route="account" />;

  if (user && !user.verified) return <Verify />;

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
          <select className="select select-bordered w-full max-w-xs h-[10px]">
            <option disabled selected>
              Filter
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div className="h-auto overflow-y-auto">
          {roomLoading ? (
            "Loading..."
          ) : (
            <div>
              {rooms.map((room) => {
                return (
                  <RoomCard
                    title={room.address}
                    description={`${room.noOfRooms} Rooms`}
                    id={room._id}
                    thumbnail={`${room.img[0]}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </MobileNav>
      <DesktopSection account title="Dashboard" isNav route="account">
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
          <select className="select select-bordered w-full max-w-xs h-[10px]">
            <option disabled selected>
              Filter
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div className="flex w-[100%] scale-90 gap-12"></div>
      </DesktopSection>
      <ToastContainer />
    </div>
  );
};

export default Account;
