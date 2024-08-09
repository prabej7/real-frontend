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
const Account: React.FC = () => {
  const [selected, setSelected] = useState<string>("Rooms");
  const { user, error, loading } = useUserContext();
  const [query, setQuery] = useState<string>("");
  const [cookie] = useCookies(["token"]);
  useAuth("account");
  if (loading) return <Loading />;
  if (!user.verified) return <Verify />;

  if (!user.fullName) {
    return <UpdateProfile />;
  }
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  if (!loading)
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
              {selected == "Rooms" && <Rooms />}
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
