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
const Account: React.FC = () => {
  useAuth("account");

  const user = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const rooms = useRoomContext();
  useEffect(() => {
    if (user && user.email !== "") {
      setLoading(false);
    }
  }, [user, rooms]);
  if (loading) return <Loading route="account" />;
  if (user && !user.isVerified) return <Verify />;

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
          {rooms.map((room) => {
            return (
              <RoomCard
                title={room.address}
                description={`${room.noOfRooms} Rooms`}
                id={room._id}
                thumbnail={`/${room.img[0]}`}
              />
            );
          })}
        </div>
      </MobileNav>
      <DesktopSection account title="Dashboard" isNav>
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
    </div>
  );
};

export default Account;
