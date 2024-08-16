import DesktopSection from "@/components/ui/DesktopSection";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import Verify from "./Veriy";
import useAuth from "@/hooks/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import User from "@/constant/types/user";
import { useCookies } from "react-cookie";
import axios from "axios";
import url from "@/constant/url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rooms from "./Display/Rooms";
import Hostel from "./Display/Hostel";
import Land from "./Display/Land";
import SearchDisplay from "@/components/ui/SearchDisplay";
import UpdateProfile from "@/components/ui/UpdateProfileHome";
import { useUserContext } from "@/Provider/UserContext";
import Filter from "@/components/map/Filter";
import R from "@/constant/types/rooms";
import H from "@/constant/types/Hostels";
import FilteredRoomsList from "@/components/user/FilteredBox";
import Location from "@/constant/types/location";
import FilteredHostel from "@/components/user/HostelFilterBox";
import { useNavigate } from "react-router-dom";
const Account: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filterRoom, setFilterRoom] = useState<R[]>([]);
  const [filterHostel, setFilteredHostel] = useState<H[]>([]);
  const [roomFilterBoxOpen, setRoomFilterBoxOpen] = useState<boolean>(false);
  const [hostelFilterBoxOpen, setHostelFilterBoxOpen] =
    useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Rooms");
  const { user, error, loading } = useUserContext();
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  useAuth("account");
  if (loading) return <Loading />;
  if (!user.verified) return <Verify />;

  if (!user.fullName) {
    return <UpdateProfile />;
  }
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const onRoomFilter = (rooms: R[]) => {
    if (rooms.length > 0) {
      setRoomFilterBoxOpen(true);
      setFilterRoom(rooms);
    }
  };

  const onHostelFilter = (hostels: H[]) => {
    if (hostels.length > 0) {
      setFilteredHostel(hostels);
    }
  };

  const handleMapClick = (coords: Location) => {
    navigate("/map", { state: coords });
  };

  if (!loading)
    return (
      <div className="section flex overflow-x-clip">
        <FilteredRoomsList
          open={roomFilterBoxOpen}
          items={filterRoom}
          onItemClick={handleMapClick}
          onClose={() => setRoomFilterBoxOpen(!roomFilterBoxOpen)}
        />
        <FilteredHostel
          items={filterHostel}
          open={hostelFilterBoxOpen}
          onClose={() => setHostelFilterBoxOpen(!hostelFilterBoxOpen)}
          onItemClick={handleMapClick}
        />
        <div className="relative mt-6">
          <Filter
            onFilter={onRoomFilter}
            onFilterHostel={onHostelFilter}
            open={filterOpen}
            onClose={() => setFilterOpen(!filterOpen)}
          />
        </div>

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
          <div></div>
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
          <div className="h-auto overflow-y-auto">
            <div className="pt-12">
              {selected == "Rooms" && <Rooms filteredRooms={filterRoom} />}
              {selected == "Hostels" && <Hostel />}
              {selected == "Lands" && <Land />}
            </div>
          </div>
        </MobileNav>
        <DesktopSection account title="Dashboard" isNav route="account">
          <div className="lg:w-[900px]">
            <p className=" mt-6 font-medium">What are you looking for?</p>

            <div className="flex gap-3 mt-3">
              <Input
                placeholder="Search here.."
                className="lg:w-80"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button>
                <CiSearch />
              </Button>
            </div>
            <div className="absolute z-10">
              <SearchDisplay query={query} entity={selected} />
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
